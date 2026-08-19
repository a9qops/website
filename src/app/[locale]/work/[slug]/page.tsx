import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Link } from "@/i18n/routing";
import YouTubeFacade from "@/components/YouTubeFacade";
import { Reveal } from "@/components/motion/Reveal";

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  
  const project = await prisma.project.findUnique({
    where: { slug }
  });

  if (!project || !project.published) {
    return { title: 'Not Found' };
  }

  const title = locale === 'ar' ? project.titleAr : project.titleEn;
  const description = locale === 'ar' ? project.descriptionAr : project.descriptionEn;

  return {
    title: `${title} | Ali Ismail`,
    description: description,
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;

  const project = await prisma.project.findUnique({
    where: { slug }
  });

  // Verify drafts inaccessible publicly
  if (!project || !project.published) {
    notFound();
  }

  const title = locale === 'ar' ? project.titleAr : project.titleEn;
  const description = locale === 'ar' ? project.descriptionAr : project.descriptionEn;
  const client = project.client;
  const year = project.year;

  // Next / Previous projects navigation based on sort order
  const allProjects = await prisma.project.findMany({
    where: { published: true },
    orderBy: { sortOrder: 'asc' },
    select: { id: true, slug: true, titleEn: true, titleAr: true }
  });

  const currentIndex = allProjects.findIndex(p => p.id === project.id);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

  return (
    <article className="flex flex-col max-w-[1920px] mx-auto pb-32">
      {/* 07.4 YOUTUBE PLAYER & METADATA GRID */}
      <section className="px-6 md:px-12 lg:px-24 pt-8 md:pt-12 pb-12 md:pb-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        {/* Left Column: Title and Metadata */}
        <div className="lg:col-span-4 flex flex-col space-y-8">
          <Reveal type="fade" delay={0.1}>
            <div className="flex items-center gap-4">
              <div className="h-px w-8 bg-amber-500"></div>
              <span className="text-amber-500 font-mono tracking-widest uppercase text-xs md:text-sm font-bold">
                {(currentIndex + 1).toString().padStart(2, '0')}
              </span>
            </div>
          </Reveal>

          <Reveal type="mask" delay={0.2}>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tighter uppercase font-heading text-white whitespace-pre-line leading-none">
              {title}
            </h1>
          </Reveal>

          {description && (
            <Reveal type="fade" delay={0.3}>
              <p className="text-base md:text-lg text-zinc-300 font-medium tracking-wide whitespace-pre-line leading-relaxed">
                {description}
              </p>
            </Reveal>
          )}

          <Reveal type="fade" delay={0.4}>
            <div className="pt-8 mt-8 border-t border-white/10 space-y-8">
              {client && (
                <div>
                  <h3 className="text-xs font-mono tracking-widest text-zinc-500 uppercase mb-2">
                    {locale === 'ar' ? 'العميل' : 'Client'}
                  </h3>
                  <p className="text-lg text-white font-semibold tracking-wide">
                    {client}
                  </p>
                </div>
              )}
              
              {year && (
                <div>
                  <h3 className="text-xs font-mono tracking-widest text-zinc-500 uppercase mb-2">
                    {locale === 'ar' ? 'السنة' : 'Year'}
                  </h3>
                  <p className="text-lg text-white font-semibold tracking-wide font-mono">
                    {year}
                  </p>
                </div>
              )}

              {/* Fallback metadata if nothing provided to avoid completely empty section */}
              {!client && !year && (
                <div className="text-zinc-600 font-mono tracking-widest uppercase text-xs">
                  {locale === 'ar' ? 'معلومات إضافية غير متوفرة' : 'No additional metadata'}
                </div>
              )}
            </div>
          </Reveal>
        </div>

        {/* Right Column: Video Player */}
        <div className="lg:col-span-8">
          <Reveal type="mask" delay={0.5}>
            <div className="w-full relative rounded-2xl md:rounded-[2.5rem] overflow-hidden shadow-2xl bg-zinc-900 border border-white/10">
              {project.youtubeVideoId ? (
                <YouTubeFacade videoId={project.youtubeVideoId} posterUrl={project.posterUrl} altText={title} />
              ) : project.posterUrl ? (
                <section className="w-full aspect-video relative bg-zinc-900 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={project.posterUrl} 
                    alt={locale === 'ar' ? (project.posterAltAr || title) : (project.posterAltEn || title)} 
                    className="w-full h-full object-cover" 
                  />
                </section>
              ) : (
                 <section className="w-full aspect-video bg-zinc-900 flex items-center justify-center">
                   <span className="text-zinc-600 font-mono tracking-widest text-sm uppercase">
                     {locale === 'ar' ? 'لا يوجد وسائط لعرضها' : 'No media available'}
                   </span>
                 </section>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 07.6 NEXT / PREVIOUS */}
      <section className="px-6 md:px-12 lg:px-24 mt-32 pt-16 border-t border-white/10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="w-full md:w-1/3 flex justify-start">
            {prevProject && (
              <Link href={`/work/${prevProject.slug}`} className="group inline-flex flex-col gap-2">
                <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase group-hover:text-amber-500 transition-colors">
                  {locale === 'ar' ? 'السابق' : 'Previous'}
                </span>
                <span className="text-xl md:text-2xl font-bold uppercase font-heading text-white group-hover:text-amber-500 transition-colors line-clamp-1">
                  {locale === 'ar' ? prevProject.titleAr : prevProject.titleEn}
                </span>
              </Link>
            )}
          </div>
          
          <div className="w-full md:w-1/3 flex justify-center">
            <Link href="/work" className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-zinc-900 border border-white/10 hover:border-amber-500 hover:text-amber-500 transition-colors text-white">
              <span className="sr-only">{locale === 'ar' ? 'العودة إلى الأعمال' : 'Back to Work'}</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path></svg>
            </Link>
          </div>

          <div className="w-full md:w-1/3 flex justify-end text-right rtl:text-left rtl:justify-start rtl:md:justify-end">
            {nextProject && (
              <Link href={`/work/${nextProject.slug}`} className="group inline-flex flex-col gap-2 items-end rtl:items-start">
                <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase group-hover:text-amber-500 transition-colors">
                  {locale === 'ar' ? 'التالي' : 'Next'}
                </span>
                <span className="text-xl md:text-2xl font-bold uppercase font-heading text-white group-hover:text-amber-500 transition-colors line-clamp-1">
                  {locale === 'ar' ? nextProject.titleAr : nextProject.titleEn}
                </span>
              </Link>
            )}
          </div>
        </div>
      </section>

    </article>
  );
}
