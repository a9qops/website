import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function NotFoundPage() {
  const t = useTranslations('Index'); // Re-using Index or we can just hardcode English for now, wait we can use next-intl but it might need to be a client component or server component? It can be a server component if we don't use 'use client'.
  // wait, in not-found, next-intl requires it to be a bit careful if not wrapped in provider.
  // The layout wraps it in provider.

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8">
      <h1 className="text-8xl md:text-9xl font-black font-heading tracking-tighter text-white">
        404
      </h1>
      <div className="w-16 h-1 bg-amber-500 rounded-full"></div>
      <p className="text-xl text-zinc-400 max-w-lg mx-auto font-mono uppercase tracking-widest leading-relaxed">
        The page you are looking for does not exist or has been moved.
      </p>
      <div className="pt-8">
        <Link 
          href="/" 
          className="inline-flex items-center justify-center px-8 py-4 font-bold text-black uppercase tracking-widest rounded bg-amber-500 hover:bg-white transition-all duration-300"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
