 
import Link from 'next/link';

export default function ContentDashboard() {
  const pages = [
    { name: 'Home', slug: 'home', description: 'Hero section, featured work intro' },
    { name: 'About', slug: 'about', description: 'Biography, studio overview' },
    { name: 'Services', slug: 'services', description: 'Service list and descriptions' },
    { name: 'Contact', slug: 'contact', description: 'Contact intro and call-to-action' },
  ];

  return (
    <div className="px-6 md:px-12 lg:px-24 py-12">
      <div className="space-y-4">
        <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase font-heading text-white">Page Content</h2>
        <div className="w-16 h-1 bg-amber-500 rounded-full mt-6"></div>
        <p className="mt-4 text-sm leading-6 text-zinc-400 font-mono uppercase tracking-widest">
          Select a page to edit its English and Arabic editorial content.
        </p>
      </div>

      <div className="mt-16 overflow-hidden">
        <ul role="list" className="divide-y divide-white/20">
          {pages.map((page) => (
            <li key={page.slug} className="group relative flex justify-between gap-x-6 py-8 hover:bg-white/5 transition-colors px-6 -mx-6">
              <div className="flex min-w-0 gap-x-4 items-center">
                <div className="min-w-0 flex-auto">
                  <p className="text-2xl font-black uppercase tracking-widest font-heading text-white group-hover:text-amber-500 transition-colors">
                    <Link href={`/admin/content/${page.slug}`}>
                      <span className="absolute inset-0" />
                      {page.name}
                    </Link>
                  </p>
                  <p className="mt-2 flex text-sm font-bold uppercase tracking-widest leading-5 text-zinc-500">
                    {page.description}
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-x-4">
                <span className="hidden sm:block text-xs uppercase tracking-widest font-bold text-amber-500">Edit Content</span>
                <svg className="h-6 w-6 flex-none text-zinc-400 group-hover:text-amber-500 transition-colors" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                </svg>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
