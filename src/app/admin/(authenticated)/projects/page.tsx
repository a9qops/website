import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';
import Link from 'next/link';

export default async function ProjectsPage() {
  await requireAuth();

  const projects = await prisma.project.findMany({
    orderBy: { sortOrder: 'asc' },
  });

  return (
    <div className="px-6 md:px-12 lg:px-24 py-12">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div className="space-y-4">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase font-heading text-white">Projects</h2>
          <div className="w-16 h-1 bg-amber-500 rounded-full mt-6"></div>
          <p className="mt-4 text-sm leading-6 text-zinc-400 font-mono uppercase tracking-widest">
            Manage your portfolio projects.
          </p>
        </div>
        <div className="mt-8 sm:ml-16 sm:mt-0 sm:flex-none">
          <Link
            href="/admin/projects/new"
            className="block rounded bg-amber-500 px-8 py-4 text-center text-sm font-bold uppercase tracking-widest text-black shadow-sm hover:bg-amber-400 transition-colors"
          >
            Add Project
          </Link>
        </div>
      </div>

      <div className="mt-16 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-white/20">
                <thead>
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-xs font-bold uppercase tracking-widest text-zinc-500 sm:pl-0">Poster</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-xs font-bold uppercase tracking-widest text-zinc-500">Title (EN)</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-xs font-bold uppercase tracking-widest text-zinc-500">Status</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-xs font-bold uppercase tracking-widest text-zinc-500">Featured</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-xs font-bold uppercase tracking-widest text-zinc-500">Order</th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 bg-transparent">
                  {projects.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-sm text-zinc-500">
                        No projects found. Add one to get started.
                      </td>
                    </tr>
                  ) : projects.map((project) => (
                    <tr key={project.id} className="hover:bg-zinc-900/30 transition-colors">
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">
                        {project.posterUrl ? (
                          <div className="h-16 w-28 bg-zinc-800 rounded-none overflow-hidden">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={project.posterUrl} alt={project.titleEn} className="h-full w-full object-cover" />
                          </div>
                        ) : (
                          <div className="h-16 w-28 bg-transparent border border-white/10 rounded-none flex items-center justify-center font-mono text-xs text-zinc-500 uppercase tracking-widest">
                            No Image
                          </div>
                        )}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-white font-bold uppercase tracking-wider font-heading">
                        {project.titleEn}
                        <div className="text-xs text-zinc-500 font-mono mt-1 normal-case tracking-normal">{project.slug}</div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-zinc-400">
                        {project.published ? (
                          <span className="inline-flex items-center rounded-none bg-green-500/10 px-2 py-1 text-xs font-bold uppercase tracking-widest text-green-400 ring-1 ring-inset ring-green-500/20">Published</span>
                        ) : (
                          <span className="inline-flex items-center rounded-none bg-zinc-500/10 px-2 py-1 text-xs font-bold uppercase tracking-widest text-zinc-400 ring-1 ring-inset ring-zinc-500/20">Draft</span>
                        )}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-zinc-400">
                        {project.featured ? (
                          <span className="text-amber-500 font-bold uppercase tracking-widest text-xs">★ Yes</span>
                        ) : (
                          <span className="text-zinc-500 font-bold uppercase tracking-widest text-xs">No</span>
                        )}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-zinc-400 font-mono">
                        {project.sortOrder.toString().padStart(2, '0')}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-bold uppercase tracking-widest sm:pr-0">
                        <Link href={`/admin/projects/${project.id}`} className="text-amber-500 hover:text-amber-400 transition-colors">
                          Edit<span className="sr-only">, {project.titleEn}</span>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
