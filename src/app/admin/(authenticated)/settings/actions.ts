"use server";

import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";

const settingsSchema = z.object({
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().optional().or(z.literal("")),
  whatsapp: z.string().optional().or(z.literal("")),
  discordWebhook: z.string().url().optional().or(z.literal("")),
  instagram: z.string().url().optional().or(z.literal("")),
  youtube: z.string().url().optional().or(z.literal("")),
  vimeo: z.string().url().optional().or(z.literal("")),
  locationEn: z.string().optional().or(z.literal("")),
  locationAr: z.string().optional().or(z.literal("")),
  defaultSeoTitleEn: z.string().optional().or(z.literal("")),
  defaultSeoTitleAr: z.string().optional().or(z.literal("")),
  defaultSeoDescEn: z.string().optional().or(z.literal("")),
  defaultSeoDescAr: z.string().optional().or(z.literal("")),
});

export async function updateSettings(data: Record<string, string | null>) {
  await requireAuth();

  // Validate inputs
  const validated = settingsSchema.safeParse(data);
  if (!validated.success) {
    return { success: false, error: "Validation error: Invalid format for URLs or Email" };
  }
  
  const validData = validated.data;

  await prisma.siteSettings.upsert({
    where: { id: "global" },
    update: {
      email: validData.email || null,
      phone: validData.phone || null,
      whatsapp: validData.whatsapp || null,
      discordWebhook: validData.discordWebhook || null,
      instagram: validData.instagram || null,
      youtube: validData.youtube || null,
      vimeo: validData.vimeo || null,
      locationEn: validData.locationEn || null,
      locationAr: validData.locationAr || null,
      defaultSeoTitleEn: validData.defaultSeoTitleEn || null,
      defaultSeoTitleAr: validData.defaultSeoTitleAr || null,
      defaultSeoDescEn: validData.defaultSeoDescEn || null,
      defaultSeoDescAr: validData.defaultSeoDescAr || null,
    },
    create: {
      id: "global",
      email: validData.email || null,
      phone: validData.phone || null,
      whatsapp: validData.whatsapp || null,
      discordWebhook: validData.discordWebhook || null,
      instagram: validData.instagram || null,
      youtube: validData.youtube || null,
      vimeo: validData.vimeo || null,
      locationEn: validData.locationEn || null,
      locationAr: validData.locationAr || null,
      defaultSeoTitleEn: validData.defaultSeoTitleEn || null,
      defaultSeoTitleAr: validData.defaultSeoTitleAr || null,
      defaultSeoDescEn: validData.defaultSeoDescEn || null,
      defaultSeoDescAr: validData.defaultSeoDescAr || null,
    }
  });

  revalidatePath("/", "layout");
  revalidateTag("siteSettings", "max");
  return { success: true };
}
