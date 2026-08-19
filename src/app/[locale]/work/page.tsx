import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { prisma } from "@/lib/prisma";
import { Reveal } from "@/components/motion/Reveal";

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const { locale } = await params;
  const t = await getTranslations({locale, namespace: 'Navigation'});
 
  return {
    title: `${t('work')} | Seto's Post-Production`
  };
}

export default async function WorkPage({params}: {params: Promise<{locale: string}>}) {
  const { locale } = await params;
  const t = await getTranslations({locale, namespace: "Navigation"});

  // Fetch Published Projects
  const projects = await prisma.project.findMany({
    where: { published: true },
    orderBy: { sortOrder: 'asc' },
  });

  return (
    <div className="flex flex-col space-y-12 max-w-[1920px] mx-auto pb-32">
      <div className="space-y-4 px-6 md:px-12 lg:px-24 pt-12">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase font-heading text-white">
          <span>{t("work")}</span>
        </h1>
        <div className="w-24 h-1 bg-amber-500 rounded-full mt-6"></div>
      </div>

      <section className="px-6 md:px-12 lg:px-24 mt-4">
        {projects.length === 0 ? (
          <div className="py-24 text-center border-y border-white/10">
            <p className="text-zinc-500 font-mono tracking-widest uppercase text-sm">
              {locale === 'ar' ? 'لا توجد أعمال لعرضها.' : 'No projects available.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
            {projects.map((project, idx) => (
              <Reveal type="fade" delay={idx * 0.1} key={project.id}>
                <Link href={`/work/${project.slug}`} className="group flex flex-col space-y-6 cursor-pointer">
                {/* Poster */}
                <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-zinc-900 border border-white/5 group-hover:border-white/20 transition-colors">
                  {project.posterUrl ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={project.posterUrl}
                        alt={locale === 'ar' ? (project.posterAltAr || project.titleAr) : (project.posterAltEn || project.titleEn)}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-700 font-mono text-xs uppercase tracking-widest">
                      {locale === 'ar' ? 'لا توجد صورة' : 'No Image'}
                    </div>
                  )}
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                </div>

                {/* Metadata */}
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-bold text-white uppercase tracking-wider font-heading group-hover:text-amber-500 transition-colors">
                      {locale === 'ar' ? project.titleAr : project.titleEn}
                    </h3>
                    <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-out">
                      <p className="text-sm text-zinc-400 mt-2 line-clamp-2 pr-8 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        {locale === 'ar' ? project.descriptionAr : project.descriptionEn}
                      </p>
                    </div>
                  </div>
                  <div className="text-zinc-500 font-mono text-xs font-bold tracking-widest mt-1.5 shrink-0">
                    {(idx + 1).toString().padStart(2, '0')}
                  </div>
                </div>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
