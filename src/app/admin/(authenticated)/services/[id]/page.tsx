import { requireAuth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import ServiceEditor from '../ServiceEditor';

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  await requireAuth();
  const { id } = await params;
  const service = await prisma.service.findUnique({ where: { id } });
  if (!service) notFound();
  return <div className="mx-auto max-w-7xl px-6 py-8 sm:px-6 lg:px-8"><ServiceEditor initialData={service} /></div>;
}
