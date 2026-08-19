import { prisma } from "@/lib/prisma";
import SettingsEditor from "./SettingsEditor";

export default async function SettingsPage() {
  const settings = await prisma.siteSettings.findUnique({
    where: { id: 'global' },
  });

  return <SettingsEditor initialData={settings || {}} />;
}
