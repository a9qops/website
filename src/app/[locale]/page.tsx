import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { prisma } from "@/lib/prisma";
import { Reveal } from "@/components/motion/Reveal";


export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const { locale } = await params;
  const t = await getTranslations({locale, namespace: 'Index'});
 
  return {
    title: t('title')
  };
}

export default async function HomePage({params}: {params: Promise<{locale: string}>}) {
  const { locale } = await params;
  
  // Fetch content from DB
  const pageData = await prisma.pageContent.findUnique({
    where: { pageSlug: 'home' }
  });

  let content: Record<string, string> = {};
  if (pageData) {
    try {
      content = JSON.parse(locale === 'ar' ? pageData.contentAr : pageData.contentEn);
    } catch {}
  }

  // Fetch Featured Projects
  const featuredProjects = await prisma.project.findMany({
    where: { published: true, featured: true },
    orderBy: { sortOrder: 'asc' },
    take: 6
  });

  const heroEyebrow = content.heroEyebrow || (locale === 'ar' ? 'محرر ما بعد الإنتاج السينمائي' : 'CINEMATIC POST-PRODUCTION EDITOR');
  const heroHeadline = content.heroHeadline || (locale === 'ar' ? 'علي\nإسماعيل' : 'ALI\nISMAIL');
  const heroIntro = content.heroIntro || (locale === 'ar' ? 'أحوّل اللقطات إلى قصص تبقى في الذاكرة.' : 'Editing images into stories that stay with you.');
  const heroCta = content.heroCta || (locale === 'ar' ? 'شاهد الأعمال المختارة' : 'View Selected Work');
  const featuredHeading = content.featuredHeading || (locale === 'ar' ? 'أعمال مختارة' : 'Selected Work');

  return (
    <div className="flex flex-col space-y-24 max-w-[1920px] mx-auto pb-32">
      
      {/* 06.3 HERO */}
      <section className="relative flex flex-col items-center justify-center min-h-[90vh] text-center rounded-[2.5rem] overflow-hidden mx-4 md:mx-8">
        <video
          autoPlay
          loop
          muted={true}
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-80 pointer-events-none"
          src="/nabu 6.mp4"
        />
        <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>

        <div className="relative z-10 flex flex-col items-center space-y-8 mt-12 px-4 w-full">
          {/* Eyebrow */}
          <div className="flex items-center gap-4">
            <div className="h-px w-8 bg-amber-500"></div>
            <Reveal type="fade" delay={0.1}>
              <span className="text-amber-500 font-mono tracking-widest uppercase text-xs md:text-sm font-bold">
                {heroEyebrow}
              </span>
            </Reveal>
            <div className="h-px w-8 bg-amber-500"></div>
          </div>

          {/* Headline */}
          <Reveal type="mask" delay={0.2}>
            <h1 className="text-5xl md:text-7xl lg:text-[8rem] font-bold tracking-tighter uppercase font-heading text-white whitespace-pre-line leading-none">
              {heroHeadline}
            </h1>
          </Reveal>
          
          {/* Intro */}
          <Reveal type="fade" delay={0.4}>
            <div>
              <p className="text-lg md:text-2xl text-zinc-300 font-medium tracking-wide max-w-2xl mx-auto uppercase whitespace-pre-line">
                {heroIntro}
              </p>
            </div>
          </Reveal>
          
          {/* CTA */}
          <Reveal type="fade" delay={0.6}>
            <div className="pt-12">
              <Link 
                href="/work" 
                className="group inline-flex items-center justify-center px-10 py-5 font-bold text-white uppercase tracking-widest rounded-full border border-white/20 bg-black/40 backdrop-blur-md hover:bg-white hover:text-black hover:border-white transition-all duration-300"
              >
                <span>{heroCta}</span>
                <svg className="w-5 h-5 ml-3 rtl:mr-3 rtl:ml-0 rtl:rotate-180 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </Link>
            </div>
          </Reveal>
        </div>

        {/* 06.4 EDITORIAL TIMELINE IDENTITY - Subtle Timecode */}
        <div className="absolute bottom-8 left-8 hidden md:flex items-center gap-3 text-white/50 font-mono text-xs tracking-widest">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
          <span>REC</span>
          <span>00:00:01:00</span>
        </div>
      </section>

      {/* 06.5 FEATURED WORK */}
      <section className="px-6 md:px-12 lg:px-24">
        <Reveal type="mask">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 space-y-6 md:space-y-0">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-amber-500 font-mono tracking-widest text-sm font-bold uppercase">01 // Portfolio</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-bold font-heading uppercase tracking-tight text-white">
                {featuredHeading}
              </h2>
            </div>
            <Link href="/work" className="text-zinc-400 hover:text-white uppercase tracking-widest text-sm font-bold font-mono transition-colors border-b border-zinc-700 hover:border-white pb-1">
              {locale === 'ar' ? 'عرض كل الأعمال' : 'View All Work'}
            </Link>
          </div>
        </Reveal>

        {featuredProjects.length === 0 ? (
          <div className="py-24 text-center border-y border-white/10">
            <p className="text-zinc-500 font-mono tracking-widest uppercase text-sm">
              {locale === 'ar' ? 'لا توجد أعمال مختارة.' : 'No featured work available.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {featuredProjects.map((project, idx) => (
              <Reveal type="fade" delay={idx * 0.1} key={project.id}>
                <Link href={`/work/${project.slug}`} className="group flex flex-col space-y-6 cursor-pointer">
                  {/* Poster */}
                  <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-zinc-900 border border-white/5 group-hover:border-white/20 transition-colors">
                    {project.posterUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={project.posterUrl}
                        alt={locale === 'ar' ? (project.posterAltAr || project.titleAr) : (project.posterAltEn || project.titleEn)}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
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

      {/* SHORT ABOUT / SERVICES CTA */}
      <section className="px-6 md:px-12 lg:px-24">
        <Reveal type="fade" delay={0.2}>
          <div className="bg-zinc-900/50 border border-white/5 rounded-3xl p-12 md:p-24 text-center space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            
            <h2 className="text-3xl md:text-5xl font-bold font-heading uppercase text-white tracking-tight">
              {locale === 'ar' ? 'رؤية علي السينمائية.' : 'Ali’s Cinematic Eye.'}
            </h2>
            <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto">
              {locale === 'ar' 
                ? 'علي إسماعيل محرر ما بعد إنتاج سينمائي متخصص في المونتاج وتصحيح الألوان والمعالجة النهائية للأفلام والإعلانات والقصص الرقمية.'
                : 'Ali Ismail is a cinematic post-production editor specialising in editing, colour grading, and final finishing for films, commercials, and digital stories.'}
            </p>
            <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-6 relative z-10">
              <Link href="/about" className="text-white uppercase tracking-widest text-sm font-bold font-mono transition-colors border-b border-zinc-700 hover:border-white pb-1">
                {locale === 'ar' ? 'عن علي' : 'About Ali'}
              </Link>
              <Link href="/services" className="text-white uppercase tracking-widest text-sm font-bold font-mono transition-colors border-b border-zinc-700 hover:border-amber-500 hover:text-amber-500 pb-1">
                {locale === 'ar' ? 'خدماتنا' : 'Our Expertise'}
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

    </div>
  );
}
