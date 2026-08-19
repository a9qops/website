'use server';

import { requireAuth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { extractYouTubeVideoId } from '@/lib/youtube';
import { z } from 'zod';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { randomUUID } from 'crypto';
import fs from 'fs';

const projectSchema = z.object({
  id: z.string().optional(),
  titleEn: z.string().min(1),
  titleAr: z.string().min(1),
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/),
  descriptionEn: z.string().optional(),
  descriptionAr: z.string().optional(),
  client: z.string().optional(),
  year: z.string().optional(),
  youtubeUrl: z.string().optional().nullable(),
  posterUrl: z.string().optional().nullable(),
  posterAltEn: z.string().optional(),
  posterAltAr: z.string().optional(),
  featured: z.boolean().default(false),
  published: z.boolean().default(false),
  sortOrder: z.number().int().default(0),
});

export async function saveProject(data: z.infer<typeof projectSchema> & { id?: string }) {
  try {
    await requireAuth();

    // Ensure numeric sortOrder
    if (typeof data.sortOrder === 'string') {
      data.sortOrder = parseInt(data.sortOrder, 10);
      if (isNaN(data.sortOrder)) data.sortOrder = 0;
    }

    const parsed = projectSchema.safeParse(data);
    if (!parsed.success) {
      return { success: false, error: 'Validation failed.' };
    }

    const payload = parsed.data;

    // Process YouTube URL
    let youtubeVideoId = null;
    let validatedYoutubeUrl = null;
    if (payload.youtubeUrl) {
      youtubeVideoId = extractYouTubeVideoId(payload.youtubeUrl);
      if (!youtubeVideoId) {
        return { success: false, error: 'Invalid YouTube URL.' };
      }
      validatedYoutubeUrl = payload.youtubeUrl;
    }

    // Slug Uniqueness check
    const existingSlug = await prisma.project.findUnique({
      where: { slug: payload.slug },
    });

    if (existingSlug && existingSlug.id !== payload.id) {
      return { success: false, error: 'Slug is already in use.' };
    }

    let savedProject;

    if (payload.id) {
      // Update
      savedProject = await prisma.project.update({
        where: { id: payload.id },
        data: {
          titleEn: payload.titleEn,
          titleAr: payload.titleAr,
          slug: payload.slug,
          descriptionEn: payload.descriptionEn,
          descriptionAr: payload.descriptionAr,
          client: payload.client,
          year: payload.year,
          youtubeUrl: validatedYoutubeUrl,
          youtubeVideoId,
          posterUrl: payload.posterUrl,
          posterAltEn: payload.posterAltEn,
          posterAltAr: payload.posterAltAr,
          featured: payload.featured,
          published: payload.published,
          sortOrder: payload.sortOrder,
        },
      });
    } else {
      // Create
      savedProject = await prisma.project.create({
        data: {
          titleEn: payload.titleEn,
          titleAr: payload.titleAr,
          slug: payload.slug,
          descriptionEn: payload.descriptionEn,
          descriptionAr: payload.descriptionAr,
          client: payload.client,
          year: payload.year,
          youtubeUrl: validatedYoutubeUrl,
          youtubeVideoId,
          posterUrl: payload.posterUrl,
          posterAltEn: payload.posterAltEn,
          posterAltAr: payload.posterAltAr,
          featured: payload.featured,
          published: payload.published,
          sortOrder: payload.sortOrder,
        },
      });
    }

    revalidatePath('/[locale]/work', 'page');
    revalidatePath('/[locale]/work/[id]', 'page');
    revalidatePath('/[locale]', 'page'); // Home page

    return { success: true, id: savedProject.id };
  } catch (error: unknown) {
    console.error('Save project error:', error);
    return { success: false, error: 'Database error: ' + (error as Error).message };
  }
}

export async function uploadMedia(formData: FormData) {
  try {
    await requireAuth();

    const file = formData.get('file') as File;
    if (!file) {
      return { success: false, error: 'No file provided.' };
    }

    const mimeType = file.type;
    if (!mimeType.startsWith('image/')) {
      return { success: false, error: 'Invalid file type. Only images are allowed for posters.' };
    }

    if (file.size > 5 * 1024 * 1024) {
      return { success: false, error: 'File too large. Maximum 5MB.' };
    }

    const ext = file.name.split('.').pop() || 'jpg';
    const filename = `${randomUUID()}.${ext}`;
    
    // PRODUCTION MEDIA PROVIDER: UNKNOWN — REQUIRES DEPLOYMENT DECISION
    // Temporary Dev-Only Storage: public/uploads
    const uploadDir = join(process.cwd(), 'public', 'uploads');
    
    // Ensure dir exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const filePath = join(uploadDir, filename);
    await writeFile(filePath, buffer);

    const url = `/uploads/${filename}`;

    // Create MediaAsset record
    await prisma.mediaAsset.create({
      data: {
        key: filename,
        url,
        mimeType,
      }
    });

    return { success: true, url };
  } catch (error: unknown) {
    console.error('Upload error:', error);
    return { success: false, error: 'Upload failed: ' + (error as Error).message };
  }
}
