import Link from 'next/link';
import { getServices } from './actions';
import ServiceDeleteButton from './ServiceDeleteButton';

export default async function ServicesPage() {
  const services = await getServices();

  return <div className="px-6 py-12 md:px-12 lg:px-24">
    <div className="sm:flex sm:items-center sm:justify-between">
      <div className="space-y-4"><h2 className="font-heading text-4xl font-black uppercase tracking-tighter text-white md:text-5xl">Services</h2><div className="mt-6 h-1 w-16 rounded-full bg-amber-500" /><p className="font-mono text-sm uppercase tracking-widest text-zinc-400">Manage your studio services.</p></div>
      <Link href="/admin/services/new" className="mt-8 block rounded bg-amber-500 px-8 py-4 text-center text-sm font-bold uppercase tracking-widest text-black transition-colors hover:bg-amber-400 sm:mt-0">Add Service</Link>
    </div>
    <div className="mt-16 overflow-x-auto border-t border-white/20"><table className="min-w-full divide-y divide-white/10"><thead><tr><th className="py-4 text-left text-xs font-bold uppercase tracking-widest text-zinc-500">Title (EN)</th><th className="py-4 text-left text-xs font-bold uppercase tracking-widest text-zinc-500">Title (AR)</th><th className="py-4 text-left text-xs font-bold uppercase tracking-widest text-zinc-500">Order</th><th className="py-4" /></tr></thead><tbody className="divide-y divide-white/10">
      {services.length === 0 ? <tr><td colSpan={4} className="py-10 text-center text-sm text-zinc-500">No services found. Add one to get started.</td></tr> : services.map((service) => <tr key={service.id} className="hover:bg-zinc-900/30"><td className="py-5 pr-6 font-heading font-bold uppercase tracking-wider text-white">{service.titleEn}</td><td className="py-5 pr-6 text-white" dir="rtl">{service.titleAr}</td><td className="py-5 pr-6 font-mono text-zinc-400">{service.sortOrder.toString().padStart(2, '0')}</td><td className="py-5 text-right"><Link href={`/admin/services/${service.id}`} className="mr-5 text-sm font-bold uppercase tracking-widest text-amber-500 hover:text-amber-400">Edit</Link><ServiceDeleteButton id={service.id} title={service.titleEn} /></td></tr>)}
    </tbody></table></div>
  </div>;
}
