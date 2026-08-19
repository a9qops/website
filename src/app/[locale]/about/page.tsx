import { getTranslations } from "next-intl/server";
import { prisma } from "@/lib/prisma";

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const { locale } = await params;
  const t = await getTranslations({locale, namespace: 'Navigation'});
 
  return {
    title: `${t('about')} | Ali Ismail`
  };
}

export default async function AboutPage({params}: {params: Promise<{locale: string}>}) {
  const { locale } = await params;

  // Fetch content from DB
  const pageData = await prisma.pageContent.findUnique({
    where: { pageSlug: 'about' }
  });

  let content: Record<string, string> = {};
  if (pageData) {
    try {
      content = JSON.parse(locale === 'ar' ? pageData.contentAr : pageData.contentEn);
    } catch {}
  }

  const eyebrow = content.eyebrow || (locale === 'ar' ? 'عن علي' : 'ABOUT ALI');
  const heading = content.heading || (locale === 'ar' ? 'مونتاج سينمائي\nبهدف واضح' : 'CINEMATIC EDITING\nWITH INTENT');
  const biography = content.biography || (locale === 'ar' 
    ? 'علي إسماعيل محرر ما بعد إنتاج سينمائي يركّز على الإيقاع والعاطفة والوضوح. يحوّل اللقطات الخام إلى أفلام وإعلانات وقصص رقمية مدروسة من أول كادر إلى آخره.'
    : 'Ali Ismail is a cinematic post-production editor focused on rhythm, emotion, and clarity. He shapes raw footage into films, commercials, and digital stories that feel considered from the first frame to the last.');
  const secondaryStatement = content.secondaryStatement || (locale === 'ar'
    ? 'يُبنى كل مشروع بعين صانع أفلام: إيجاد الإيقاع المناسب، وصناعة الأجواء، وتقديم معالجة نهائية تخدم القصة.'
    : 'Every project is approached with a filmmaker\'s eye: finding the right pace, building the right atmosphere, and delivering a finish that serves the story.');

  return (
    <div className="flex flex-col max-w-[1920px] mx-auto pb-32">
      
      {/* 06.7 ABOUT PAGE - Editorial Header */}
      <section className="px-6 md:px-12 lg:px-24 pt-12 md:pt-24 pb-16 border-b border-white/5">
        <div className="flex items-center gap-4 mb-8">
          <span className="text-amber-500 font-mono tracking-widest text-sm font-bold uppercase">
            {eyebrow}
          </span>
          <div className="h-px w-24 bg-zinc-800"></div>
        </div>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter uppercase font-heading text-white max-w-5xl">
          <span>ALI</span><br />
          <span className="text-zinc-600">ISMAIL</span>
        </h1>
      </section>

      <section className="px-6 md:px-12 lg:px-24 py-16 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          
          {/* Portrait / Media placeholder */}
          <div className="lg:col-span-5 relative">
            <div className="w-full aspect-[3/4] md:aspect-square relative bg-zinc-900 border border-white/10 group overflow-hidden">
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-linear-to-tr from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 flex flex-col justify-end p-8"></div>
              
              {/* Timeline frame decorative elements */}
              <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-zinc-500/50"></div>
              <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-zinc-500/50"></div>
              <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-zinc-500/50"></div>
              <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-zinc-500/50"></div>
              
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="font-heading text-8xl text-white/5 uppercase select-none font-bold">A</span>
              </div>
            </div>
            
            <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
          </div>
          
          {/* Biography */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-12">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.1] font-heading uppercase whitespace-pre-line tracking-tight">
                {heading}
              </h2>
            </div>

            <div className="space-y-8 text-lg md:text-xl text-zinc-400 font-sans leading-relaxed whitespace-pre-line max-w-2xl">
              <p className="text-zinc-300 font-medium">{biography}</p>
              {secondaryStatement && <p>{secondaryStatement}</p>}
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
