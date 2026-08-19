/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { requireAuth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const updateSchema = z.object({
  pageSlug: z.string().min(1),
  titleEn: z.string().min(1),
  titleAr: z.string().min(1),
  contentEn: z.string(),
  contentAr: z.string(),
});

export async function updatePageContent(data: any) {
  try {
    await requireAuth();

    const parsed = updateSchema.safeParse(data);
    if (!parsed.success) {
      return { success: false, error: 'Validation failed.' };
    }

    const { pageSlug, titleEn, titleAr, contentEn, contentAr } = parsed.data;

    await prisma.pageContent.upsert({
      where: { pageSlug },
      update: {
        titleEn,
        titleAr,
        contentEn,
        contentAr,
      },
      create: {
        pageSlug,
        titleEn,
        titleAr,
        contentEn,
        contentAr,
      },
    });

    // Revalidate public routes to reflect changes immediately
    revalidatePath(`/[locale]`, 'layout'); // Revalidate all localized pages

    return { success: true };
  } catch (error: any) {
    console.error('Update content error:', error);
    return { success: false, error: 'Database save error: ' + error.message };
  }
}
