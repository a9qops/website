import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';
import { notFound } from 'next/navigation';
import ContentEditor from './ContentEditor';
import Link from 'next/link';

const validPages = ['home', 'about', 'services', 'contact'];

export default async function EditContentPage({ params }: { params: Promise<{ slug: string }> }) {
  await requireAuth();

  const { slug } = await params;
  if (!validPages.includes(slug)) {
    notFound();
  }

  // Fetch existing content
  const pageContent = await prisma.pageContent.findUnique({
    where: { pageSlug: slug },
  });

  const initialData = {
    pageSlug: slug,
    titleEn: pageContent?.titleEn || '',
    titleAr: pageContent?.titleAr || '',
    contentEn: pageContent?.contentEn || '{}',
    contentAr: pageContent?.contentAr || '{}',
  };

  return (
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 py-8">
      <div className="px-4 sm:px-0 mb-6 flex items-center justify-between">
        <div>
          <Link href="/admin/content" className="text-sm font-medium text-zinc-500 hover:text-zinc-900 mb-2 inline-block">
            &larr; Back to Pages
          </Link>
          <h2 className="text-2xl font-semibold leading-7 text-zinc-900 capitalize">
            Edit {slug} Content
          </h2>
        </div>
      </div>

      <ContentEditor initialData={initialData} />
    </div>
  );
}
