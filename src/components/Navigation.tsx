 
"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navigation({ locale }: { locale: string }) {
  const t = useTranslations("Navigation");
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const otherLocale = locale === "en" ? "ar" : "en";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Menu is closed via onClick on links

  const navLinks = [
    { href: "/", label: t("home") },
    { href: "/work", label: t("work") },
    { href: "/about", label: t("about") },
    { href: "/services", label: t("services") || "Services" },
    { href: "/contact", label: t("contact") },
  ];

  return (
    <>
      <header 
        className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
          scrolled ? "bg-background border-b border-surface" : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-screen-2xl mx-auto px-6 sm:px-8 lg:px-12 h-20 flex items-center justify-between">
          
          <Link href="/" className="flex items-center gap-2 group z-50 relative">
            <div className="font-heading font-black text-2xl tracking-tighter text-white group-hover:text-accent transition-colors">
              ALI<span className="text-accent">.</span>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 font-sans font-medium text-sm tracking-widest uppercase">
            {navLinks.map((link) => {
              const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  className={`relative py-2 group overflow-hidden transition-colors ${
                    isActive ? "text-accent" : "text-muted hover:text-white"
                  }`}
                >
                  <span className="relative z-10">{link.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-accent" />
                  )}
                  {/* Hover effect timeline rule */}
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-surface -translate-x-full rtl:translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-6">
            <Link 
              href={pathname} 
              locale={otherLocale}
              className="text-xs font-mono font-bold uppercase tracking-widest text-muted hover:text-white transition-colors border border-surface px-3 py-1 bg-surface/30 hover:border-accent"
              aria-label="Switch Language"
            >
              {otherLocale === 'en' ? 'EN' : 'AR'}
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden relative z-50 p-2 -mr-2 text-white hover:text-accent transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-background flex flex-col pt-24 px-6 pb-12 overflow-y-auto"
          >
            {/* Timeline Rule for Mobile Menu */}
            <div className="w-full h-px bg-surface mb-12 relative">
              <div className="absolute top-1/2 left-0 w-12 h-0.5 bg-accent -translate-y-1/2"></div>
            </div>

            <nav className="flex flex-col gap-6 font-heading font-black text-4xl sm:text-5xl uppercase tracking-tighter">
              {navLinks.map((link, i) => {
                const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.05, duration: 0.3 }}
                  >
                    <Link 
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center group transition-colors ${
                        isActive ? "text-accent" : "text-white hover:text-accent"
                      }`}
                    >
                      <span className="text-xs font-mono text-muted mr-4 w-6">{`0${i + 1}`}</span>
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            <div className="mt-auto pt-12">
              <div className="w-full h-px bg-surface mb-8"></div>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex items-center justify-between"
              >
                <div className="text-xs font-mono text-muted uppercase tracking-widest">
                  Language Preference
                </div>
                <Link 
                  href={pathname} 
                  locale={otherLocale}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm font-mono font-bold uppercase tracking-widest text-white hover:text-accent transition-colors border border-surface px-4 py-2 bg-surface/50"
                  aria-label="Switch Language"
                >
                  {otherLocale === 'en' ? 'English' : 'عربي'}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
