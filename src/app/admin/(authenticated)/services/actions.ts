'use server';

import { requireAuth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const serviceSchema = z.object({
  id: z.string().uuid().optional(),
  titleEn: z.string().trim().min(1),
  titleAr: z.string().trim().min(1),
  descriptionEn: z.string().trim().min(1),
  descriptionAr: z.string().trim().min(1),
  sortOrder: z.coerce.number().int().default(0),
});

export type ServiceInput = z.input<typeof serviceSchema>;

export async function getServices() {
  await requireAuth();

  return prisma.service.findMany({
    orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
  });
}

export async function saveService(data: ServiceInput) {
  try {
    await requireAuth();
    const parsed = serviceSchema.safeParse(data);

    if (!parsed.success) {
      return { success: false, error: 'Please complete every service field.' };
    }

    const { id, ...serviceData } = parsed.data;
    const service = id
      ? await prisma.service.update({ where: { id }, data: serviceData })
      : await prisma.service.create({ data: serviceData });

    revalidatePath('/[locale]/services', 'page');
    return { success: true, id: service.id };
  } catch (error) {
    console.error('Save service error:', error);
    return { success: false, error: 'Unable to save the service.' };
  }
}

export async function deleteService(id: string) {
  try {
    await requireAuth();
    const parsedId = z.string().uuid().safeParse(id);
    if (!parsedId.success) return { success: false, error: 'Invalid service.' };

    await prisma.service.delete({ where: { id: parsedId.data } });
    revalidatePath('/[locale]/services', 'page');
    return { success: true };
  } catch (error) {
    console.error('Delete service error:', error);
    return { success: false, error: 'Unable to delete the service.' };
  }
}
