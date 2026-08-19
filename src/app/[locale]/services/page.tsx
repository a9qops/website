import { getTranslations } from "next-intl/server";
import { prisma } from "@/lib/prisma";

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const { locale } = await params;
  const t = await getTranslations({locale, namespace: 'Navigation'});
 
  return {
    title: `${t('services')} | Seto's Post-Production`
  };
}

export default async function ServicesPage({params}: {params: Promise<{locale: string}>}) {
  const { locale } = await params;

  // Fetch content from DB
  const pageData = await prisma.pageContent.findUnique({
    where: { pageSlug: 'services' }
  });

  let content: Record<string, string> = {};
  if (pageData) {
    try {
      content = JSON.parse(locale === 'ar' ? pageData.contentAr : pageData.contentEn);
    } catch {}
  }

  const heading = content.heading || (locale === 'ar' ? 'الخدمات' : 'OUR EXPERTISE');
  const introduction = content.introduction || (locale === 'ar'
    ? 'نقدم مجموعة شاملة من خدمات ما بعد الإنتاج.'
    : 'We offer a comprehensive suite of post-production services, delivering industry-standard finishing for commercials, films, and digital media.');
  
  // Clean comma-separated list or fallback to empty state
  let servicesArray: string[] = [];
  if (content.servicesList) {
    servicesArray = content.servicesList.split(',').map((s: string) => s.trim()).filter(Boolean);
  }

  return (
    <div className="flex flex-col max-w-[1920px] mx-auto pb-32">
      
      {/* Header */}
      <section className="px-6 md:px-12 lg:px-24 pt-12 md:pt-24 pb-16">
        <div className="flex items-center gap-4 mb-8">
          <span className="text-amber-500 font-mono tracking-widest text-sm font-bold uppercase">
            {locale === 'ar' ? 'الخبرات' : 'SERVICES'}
          </span>
          <div className="h-px w-24 bg-zinc-800"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase font-heading text-white whitespace-pre-line leading-none">
            {heading}
          </h1>
          <div className="flex items-end">
            <p className="text-lg md:text-2xl text-zinc-400 font-medium tracking-wide max-w-xl whitespace-pre-line">
              {introduction}
            </p>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="px-6 md:px-12 lg:px-24 pt-16">
        {servicesArray.length === 0 ? (
          <div className="py-24 text-center border-y border-white/5">
            <p className="text-zinc-500 font-mono tracking-widest uppercase text-sm">
              {locale === 'ar' ? 'الخدمات غير متوفرة حالياً.' : 'No services listed.'}
            </p>
          </div>
        ) : (
          <div className="border-t border-white/10">
            {servicesArray.map((service, idx) => (
              <div 
                key={idx} 
                className="group flex flex-col md:flex-row md:items-center justify-between py-10 md:py-16 border-b border-white/5 hover:border-amber-500/50 transition-colors"
              >
                <div className="flex items-start gap-8 md:gap-16">
                  <span className="text-zinc-600 font-mono font-bold text-sm md:text-lg tracking-widest mt-2 shrink-0 group-hover:text-amber-500 transition-colors">
                    {(idx + 1).toString().padStart(2, '0')}
                  </span>
                  <h3 className="text-3xl md:text-6xl font-heading font-bold uppercase text-white group-hover:text-zinc-300 transition-colors tracking-tight">
                    {service}
                  </h3>
                </div>
                {/* Visual Decorative arrow */}
                <div className="hidden md:block opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0 rtl:translate-x-4 rtl:group-hover:translate-x-0 transition-all duration-500">
                  <svg className="w-12 h-12 text-amber-500 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

    </div>
  );
}
