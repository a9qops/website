import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";
import { getSiteSettings } from "@/lib/settings";

export default async function Footer() {
  const t = await getTranslations("Navigation");
  const locale = await getLocale();
  const settings = await getSiteSettings();

  return (
    <footer className="w-full mt-32 border-t border-white/10 bg-black overflow-hidden relative">
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24 pt-24 pb-12">
        {/* Large Contact CTA */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mb-24">
          <div className="space-y-6">
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold tracking-tighter uppercase max-w-4xl text-white whitespace-pre-line">
              {locale === 'ar' ? 'هل لديك مشروع\nفي ذهنك؟' : 'Have a project\nin mind?'}
            </h2>
          </div>
          <Link 
            href="/contact"
            className="group flex items-center gap-4 relative pb-2 overflow-hidden"
          >
            <div className="absolute bottom-0 left-0 w-full h-px bg-white/20"></div>
            <div className="absolute bottom-0 left-0 w-full h-px bg-amber-500 -translate-x-full rtl:translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[0.16,1,0.3,1]"></div>
            <span className="text-xl font-bold uppercase tracking-widest text-white group-hover:text-amber-500 transition-colors font-heading">
              {t("contact")}
            </span>
            <div className={`w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-amber-500 group-hover:bg-amber-500/10 transition-all ${locale === 'ar' ? 'rotate-180' : ''}`}>
              <ArrowRight size={20} className="text-zinc-500 group-hover:text-amber-500 transition-colors" />
            </div>
          </Link>
        </div>

        {/* Timeline Rule */}
        <div className="w-full h-px bg-white/10 mb-12 relative">
          <div className="absolute top-1/2 left-0 w-24 h-0.5 bg-amber-500 -translate-y-1/2"></div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="space-y-2">
            <div className="font-heading font-bold text-2xl tracking-tighter text-white uppercase">
              Seto<span className="text-amber-500">.</span>
            </div>
            <div className="text-zinc-500 text-sm font-mono uppercase tracking-widest">
              &copy; {new Date().getFullYear()} Seto&apos;s Post-Production. {locale === 'ar' ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-8 text-sm font-mono uppercase tracking-widest text-zinc-400">
            {settings?.instagram && (
              <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="relative group overflow-hidden pb-1">
                <span className="group-hover:text-amber-500 transition-colors">{locale === 'ar' ? 'انستغرام' : 'Instagram'}</span>
                <span className="absolute bottom-0 left-0 w-full h-px bg-amber-500 -translate-x-full rtl:translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
              </a>
            )}
            {settings?.youtube && (
              <a href={settings.youtube} target="_blank" rel="noopener noreferrer" className="relative group overflow-hidden pb-1">
                <span className="group-hover:text-amber-500 transition-colors">{locale === 'ar' ? 'يوتيوب' : 'YouTube'}</span>
                <span className="absolute bottom-0 left-0 w-full h-px bg-amber-500 -translate-x-full rtl:translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
              </a>
            )}
            {settings?.vimeo && (
              <a href={settings.vimeo} target="_blank" rel="noopener noreferrer" className="relative group overflow-hidden pb-1">
                <span className="group-hover:text-amber-500 transition-colors">{locale === 'ar' ? 'فيميو' : 'Vimeo'}</span>
                <span className="absolute bottom-0 left-0 w-full h-px bg-amber-500 -translate-x-full rtl:translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
              </a>
            )}
            {settings?.whatsapp && settings.whatsapp.replace(/[^0-9]/g, '').length > 0 && (
              <a href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="relative group overflow-hidden pb-1">
                <span className="group-hover:text-amber-500 transition-colors">{locale === 'ar' ? 'واتساب' : 'WhatsApp'}</span>
                <span className="absolute bottom-0 left-0 w-full h-px bg-amber-500 -translate-x-full rtl:translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
