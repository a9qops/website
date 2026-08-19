import type { Metadata } from "next";
import { Inter, Cairo, Space_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer"; // Global footer component
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  variable: "--font-space-mono",
  subsets: ["latin"],
});

export async function generateMetadata({ params }: { params: Promise<{locale: string}> }): Promise<Metadata> {
  const { locale } = await params;
  const { getSiteSettings } = await import('@/lib/settings');
  
  const settings = await getSiteSettings();
  
  const defaultTitle = 'Ali Ismail | Cinematic Post-Production Editor';
  const defaultDesc = 'Cinematic editing, colour grading, and finishing by Ali Ismail.';
  
  return {
    title: locale === 'ar' ? (settings?.defaultSeoTitleAr || defaultTitle) : (settings?.defaultSeoTitleEn || defaultTitle),
    description: locale === 'ar' ? (settings?.defaultSeoDescAr || defaultDesc) : (settings?.defaultSeoDescEn || defaultDesc),
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const { locale } = await params;

  if (!(routing.locales as readonly string[]).includes(locale)) {
    notFound();
  }

  const messages = await getMessages();
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${inter.variable} ${cairo.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col relative text-zinc-100 selection:bg-amber-500/30 font-sans">
        <NextIntlClientProvider messages={messages}>
          <Navigation locale={locale} />
          <main className="flex-1 w-full max-w-screen-2xl mx-auto px-6 sm:px-8 lg:px-12 py-12 md:py-24 mt-16 md:mt-24">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
