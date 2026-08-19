import { getTranslations } from "next-intl/server";
import ContactForm from "@/components/ContactForm";
import { prisma } from "@/lib/prisma";
import { getSiteSettings } from "@/lib/settings";
import { Camera, MessageCircle, Play, Video } from "lucide-react";

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const { locale } = await params;
  const t = await getTranslations({locale, namespace: 'Navigation'});
 
  return {
    title: `${t('contact')} | Ali Ismail`
  };
}

export default async function ContactPage({params}: {params: Promise<{locale: string}>}) {
  const { locale } = await params;

  // Fetch content from DB
  const pageData = await prisma.pageContent.findUnique({
    where: { pageSlug: 'contact' }
  });
  
  const siteSettings = await getSiteSettings();

  let content: Record<string, string> = {};
  if (pageData) {
    try {
      content = JSON.parse(locale === 'ar' ? pageData.contentAr : pageData.contentEn);
    } catch {}
  }

  const heading = content.heading || (locale === 'ar' ? 'لنصنع شيئاً\nلا يُنسى' : 'LET’S MAKE\nSOMETHING MEMORABLE');
  const introduction = content.introduction || (locale === 'ar' 
    ? 'لديك فيلم أو حملة أو قصة قيد التنفيذ؟ أخبر علي عنها لنجد معاً أسلوب ما بعد الإنتاج المناسب.'
    : 'Have a film, campaign, or story in progress? Tell Ali about it and let’s find the right post-production approach.');
  const ctaCopy = content.ctaCopy || (locale === 'ar' ? 'أخبرني عن مشروعك' : 'Tell Me About Your Project');
  const whatsappNumber = siteSettings?.whatsapp?.replace(/[^0-9]/g, '');
  const whatsappUrl = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(locale === 'ar' ? 'مرحباً علي، أود الاستفسار عن مشروع.' : 'Hi Ali, I would like to discuss a project.')}`
    : null;

  return (
    <div className="flex flex-col space-y-12 max-w-6xl mx-auto pb-32 pt-12">
      <div className="space-y-4">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase font-heading text-white whitespace-pre-line">
          {heading}
        </h1>
        <div className="w-24 h-1 bg-amber-500 rounded-full mt-6"></div>
        {introduction && (
          <p className="text-xl text-zinc-400 mt-6 whitespace-pre-line max-w-2xl">
            {introduction}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mt-12">
        <div className="space-y-12">
          <div>
            <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-wider font-heading">Studio Information</h2>
            <div className="space-y-6 text-zinc-400">
              {((locale === 'ar' ? siteSettings?.locationAr : siteSettings?.locationEn)) && (
                <div>
                  <p className="text-sm uppercase tracking-widest text-amber-500 mb-1 font-semibold">{locale === 'ar' ? 'الموقع' : 'Location'}</p>
                  <p className="text-lg">{locale === 'ar' ? siteSettings?.locationAr : siteSettings?.locationEn}</p>
                </div>
              )}
              {siteSettings?.phone && (
                <div>
                  <p className="text-sm uppercase tracking-widest text-amber-500 mb-1 font-semibold">{locale === 'ar' ? 'الهاتف' : 'Phone'}</p>
                  <p className="text-lg" dir="ltr">{siteSettings.phone}</p>
                </div>
              )}
              {siteSettings?.email && (
                <div>
                  <p className="text-sm uppercase tracking-widest text-amber-500 mb-1 font-semibold">{locale === 'ar' ? 'البريد الإلكتروني' : 'Email'}</p>
                  <p className="text-lg">{siteSettings.email}</p>
                </div>
              )}
              {whatsappUrl && (
                <a href={whatsappUrl} className="group block border-t border-white/10 pt-6 transition-colors hover:border-amber-500">
                  <p className="mb-1 text-sm font-semibold uppercase tracking-widest text-amber-500">{locale === 'ar' ? 'واتساب' : 'WhatsApp'}</p>
                  <p className="flex items-center gap-2 text-lg text-white group-hover:text-amber-500">
                    <MessageCircle className="h-5 w-5" aria-hidden="true" />
                    {locale === 'ar' ? 'راسل علي مباشرة على واتساب ←' : 'Message Ali directly on WhatsApp →'}
                  </p>
                </a>
              )}
              {(siteSettings?.instagram || siteSettings?.youtube || siteSettings?.vimeo) && (
                <div className="border-t border-white/10 pt-6">
                  <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-amber-500">{locale === 'ar' ? 'روابط التواصل' : 'Social Media'}</p>
                  <div className="flex flex-wrap gap-x-5 gap-y-3 text-sm font-medium text-zinc-300">
                    {siteSettings?.instagram && <a href={siteSettings.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-amber-500"><Camera className="h-4 w-4" />Instagram</a>}
                    {siteSettings?.youtube && <a href={siteSettings.youtube} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-amber-500"><Play className="h-4 w-4" />YouTube</a>}
                    {siteSettings?.vimeo && <a href={siteSettings.vimeo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-amber-500"><Video className="h-4 w-4" />Vimeo</a>}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 lg:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          
          <h2 className="text-2xl font-bold text-white mb-8 uppercase tracking-wider font-heading relative z-10 whitespace-pre-line">{ctaCopy}</h2>
          <div className="relative z-10">
            <ContactForm labels={{
              name: locale === 'ar' ? 'الاسم' : 'Name',
              email: locale === 'ar' ? 'البريد الإلكتروني' : 'Email',
              type: locale === 'ar' ? 'نوع المشروع (مثل إعلان، مؤثرات بصرية)' : 'Project Type (e.g. Commercial, VFX)',
              message: locale === 'ar' ? 'أخبرنا عن مشروعك' : 'Tell us about your project',
              send: locale === 'ar' ? 'إرسال الرسالة' : 'Send Message',
              sending: locale === 'ar' ? 'جاري الإرسال...' : 'Transmitting...',
              successTitle: locale === 'ar' ? 'تم الإرسال' : 'Transmission Sent',
              successMessage: locale === 'ar' ? 'سيطّلع علي على رسالتك ويتواصل معك قريباً.' : 'Ali will review your message and be in touch shortly.',
              sendAnother: locale === 'ar' ? 'إرسال رسالة أخرى' : 'Send another message',
              errorPrefix: locale === 'ar' ? 'فشل في إرسال الرسالة. يرجى المحاولة مرة أخرى.' : 'Failed to send message. Please try again.'
            }} />
          </div>
        </div>
      </div>
    </div>
  );
}
