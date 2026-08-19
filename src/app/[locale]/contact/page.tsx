import { getTranslations } from "next-intl/server";
import ContactForm from "@/components/ContactForm";
import { prisma } from "@/lib/prisma";
import { getSiteSettings } from "@/lib/settings";

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const { locale } = await params;
  const t = await getTranslations({locale, namespace: 'Navigation'});
 
  return {
    title: `${t('contact')} | Seto's Post-Production`
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

  const heading = content.heading || (locale === 'ar' ? 'تواصل معنا' : "CONTACT US");
  const introduction = content.introduction || (locale === 'ar' 
    ? 'نحن هنا للإجابة على أسئلتك والبدء في مشروعك التالي.'
    : 'We are here to answer your questions and start your next project.');
  const ctaCopy = content.ctaCopy || (locale === 'ar' ? 'ابدأ مشروعك' : 'Start a Project');

  return (
    <div className="flex flex-col space-y-12 max-w-6xl mx-auto pb-32 pt-12">
      <div className="space-y-4">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase font-heading text-white whitespace-pre-line">
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
              successMessage: locale === 'ar' ? 'سيقوم فريقنا بمراجعة مشروعك والتواصل معك قريباً.' : 'Our producers will review your project and be in touch shortly.',
              sendAnother: locale === 'ar' ? 'إرسال رسالة أخرى' : 'Send another message',
              errorPrefix: locale === 'ar' ? 'فشل في إرسال الرسالة. يرجى المحاولة مرة أخرى.' : 'Failed to send message. Please try again.'
            }} />
          </div>
        </div>
      </div>
    </div>
  );
}
