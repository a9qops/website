 
import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div className="px-6 md:px-12 lg:px-24 py-12">
      <div className="space-y-4">
        <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase font-heading text-white">Dashboard</h2>
        <div className="w-16 h-1 bg-amber-500 rounded-full mt-6"></div>
        <p className="mt-4 text-sm font-bold uppercase tracking-widest text-zinc-500">
          Manage Ali Ismail&apos;s portfolio, services, and site content.
        </p>
      </div>
      
      <div className="mt-16 grid grid-cols-1 gap-8 md:gap-12 lg:grid-cols-3">
        {/* Quick Links */}
        <div className="group border border-white/10 p-8 hover:border-amber-500/50 transition-colors bg-transparent">
          <h3 className="text-2xl font-black uppercase tracking-widest font-heading text-white group-hover:text-amber-500 transition-colors">Projects</h3>
          <p className="mt-4 text-sm font-bold uppercase tracking-widest leading-6 text-zinc-500">Manage portfolio projects and media.</p>
          <div className="mt-8">
            <Link href="/admin/projects" className="text-xs font-bold uppercase tracking-widest text-amber-500 hover:text-amber-400">
              View all projects &rarr;
            </Link>
          </div>
        </div>
        
        <div className="group border border-white/10 p-8 hover:border-amber-500/50 transition-colors bg-transparent">
          <h3 className="text-2xl font-black uppercase tracking-widest font-heading text-white group-hover:text-amber-500 transition-colors">Page Content</h3>
          <p className="mt-4 text-sm font-bold uppercase tracking-widest leading-6 text-zinc-500">Edit Home, About, Services, and Contact copy.</p>
          <div className="mt-8">
            <Link href="/admin/content" className="text-xs font-bold uppercase tracking-widest text-amber-500 hover:text-amber-400">
              Manage content &rarr;
            </Link>
          </div>
        </div>
        
        <div className="group border border-white/10 p-8 hover:border-amber-500/50 transition-colors bg-transparent">
          <h3 className="text-2xl font-black uppercase tracking-widest font-heading text-white group-hover:text-amber-500 transition-colors">Settings</h3>
          <p className="mt-4 text-sm font-bold uppercase tracking-widest leading-6 text-zinc-500">Update global site settings and SEO.</p>
          <div className="mt-8">
            <Link href="/admin/settings" className="text-xs font-bold uppercase tracking-widest text-amber-500 hover:text-amber-400">
              Site settings &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
