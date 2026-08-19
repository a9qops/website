'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AlertCircle, Loader2 } from 'lucide-react';
import type { Service } from '@prisma/client';
import { saveService } from './actions';

export default function ServiceEditor({ initialData }: { initialData?: Service }) {
  const router = useRouter();
  const [status, setStatus] = useState<'idle' | 'saving' | 'error'>('idle');
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    id: initialData?.id,
    titleEn: initialData?.titleEn ?? '',
    titleAr: initialData?.titleAr ?? '',
    descriptionEn: initialData?.descriptionEn ?? '',
    descriptionAr: initialData?.descriptionAr ?? '',
    sortOrder: initialData?.sortOrder ?? 0,
  });

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('saving');
    setError('');
    const result = await saveService(formData);

    if (result.success) {
      router.push('/admin/services');
      router.refresh();
      return;
    }

    setStatus('error');
    setError(result.error ?? 'Failed to save service.');
  };

  return (
    <form onSubmit={handleSave} className="space-y-12">
      <div className="flex flex-col gap-6 border-b border-white/10 pb-8 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="font-heading text-4xl font-black uppercase tracking-tighter text-white md:text-5xl">
            {formData.id ? 'Edit Service' : 'New Service'}
          </h2>
          <div className="mt-6 h-1 w-16 rounded-full bg-amber-500" />
        </div>
        <div className="flex items-center gap-6">
          <button type="button" onClick={() => router.push('/admin/services')} className="text-sm font-bold uppercase tracking-widest text-zinc-400 hover:text-white">
            Cancel
          </button>
          <button type="submit" disabled={status === 'saving'} className="inline-flex items-center gap-2 rounded bg-amber-500 px-6 py-3 text-sm font-bold uppercase tracking-widest text-black transition-colors hover:bg-amber-400 disabled:opacity-50">
            {status === 'saving' && <Loader2 className="h-4 w-4 animate-spin" />}
            {status === 'saving' ? 'Saving...' : 'Save Service'}
          </button>
        </div>
      </div>

      {status === 'error' && <div className="flex items-start gap-3 border border-red-500/30 bg-red-500/10 p-4 text-red-200"><AlertCircle className="h-5 w-5 shrink-0" /><p>{error}</p></div>}

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <Field label="Title (EN)"><input name="titleEn" required value={formData.titleEn} onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })} className="w-full border-b border-white/20 bg-transparent px-0 py-4 text-white focus:border-amber-500 focus:outline-none sm:text-sm sm:leading-6" /></Field>
        <Field label="Title (AR)" rtl><input name="titleAr" required value={formData.titleAr} onChange={(e) => setFormData({ ...formData, titleAr: e.target.value })} className="w-full border-b border-white/20 bg-transparent px-0 py-4 text-right text-white focus:border-amber-500 focus:outline-none sm:text-sm sm:leading-6" /></Field>
        <Field label="Description (EN)"><textarea name="descriptionEn" required rows={7} value={formData.descriptionEn} onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })} className="w-full resize-y border-b border-white/20 bg-transparent px-0 py-4 text-white focus:border-amber-500 focus:outline-none sm:text-sm sm:leading-6" /></Field>
        <Field label="Description (AR)" rtl><textarea name="descriptionAr" required rows={7} value={formData.descriptionAr} onChange={(e) => setFormData({ ...formData, descriptionAr: e.target.value })} className="w-full resize-y border-b border-white/20 bg-transparent px-0 py-4 text-right text-white focus:border-amber-500 focus:outline-none sm:text-sm sm:leading-6" /></Field>
        <Field label="Display Order"><input name="sortOrder" type="number" value={formData.sortOrder} onChange={(e) => setFormData({ ...formData, sortOrder: Number(e.target.value) || 0 })} className="w-full border-b border-white/20 bg-transparent px-0 py-4 text-white focus:border-amber-500 focus:outline-none sm:text-sm sm:leading-6" /></Field>
      </div>
    </form>
  );
}

function Field({ label, children, rtl = false }: { label: string; children: React.ReactNode; rtl?: boolean }) {
  return <div dir={rtl ? 'rtl' : undefined}><label className="mb-2 block text-xs font-bold uppercase tracking-widest text-zinc-500">{label}</label>{children}</div>;
}

