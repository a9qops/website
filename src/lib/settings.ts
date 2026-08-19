import { prisma } from "./prisma";
import { unstable_cache } from "next/cache";
import type { SiteSettings } from "@prisma/client";

export const getSiteSettings = unstable_cache(
  async (): Promise<SiteSettings | null> => {
    try {
      const settings = await prisma.siteSettings.findUnique({
        where: { id: "global" },
      });
      return settings;
    } catch (error) {
      console.error("Failed to fetch site settings:", error);
      return null;
    }
  },
  ["siteSettings"],
  { tags: ["siteSettings"], revalidate: 3600 }
);
