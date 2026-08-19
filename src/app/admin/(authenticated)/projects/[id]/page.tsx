import { requireAuth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import ProjectEditor from '../ProjectEditor';

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAuth();

  const { id } = await params;

  const project = await prisma.project.findUnique({
    where: { id },
  });

  if (!project) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 py-8">
      <ProjectEditor initialData={project} />
    </div>
  );
}
