import { logout } from '../actions';
import Link from 'next/link';

export default function AuthenticatedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black font-sans">
      <header className="bg-black border-b border-white/10 sticky top-0 z-50">
        <div className="mx-auto max-w-[1920px] px-6 md:px-12 lg:px-24">
          <div className="flex h-20 justify-between items-center">
            <div className="flex items-center gap-8 md:gap-12">
              <Link href="/admin" className="text-2xl font-black text-white tracking-tighter uppercase font-heading hover:text-amber-500 transition-colors">
                Ali<span className="text-amber-500">Admin</span>
              </Link>
              <nav className="hidden md:flex items-center gap-8">
                <Link href="/admin/projects" className="text-sm font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors">Projects</Link>
                <Link href="/admin/services" className="text-sm font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors">Services</Link>
                <Link href="/admin/content" className="text-sm font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors">Content</Link>
                <Link href="/admin/settings" className="text-sm font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors">Settings</Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <form action={logout}>
                <button
                  type="submit"
                  className="text-sm font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors"
                >
                  Sign out
                </button>
              </form>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1920px] mx-auto">
        {children}
      </main>
    </div>
  );
}
