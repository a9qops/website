"use client";

import { useState } from 'react';
import { updateSettings } from './actions';
import { Loader2, AlertCircle } from 'lucide-react';
import type { SiteSettings } from '@prisma/client';

export default function SettingsEditor({ initialData = {} }: { initialData?: Partial<SiteSettings> }) {
  const [status, setStatus] = useState<'idle' | 'saving' | 'error' | 'success'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState({
    email: initialData.email || '',
    phone: initialData.phone || '',
    whatsapp: initialData.whatsapp || '',
    instagram: initialData.instagram || '',
    youtube: initialData.youtube || '',
    vimeo: initialData.vimeo || '',
    locationEn: initialData.locationEn || '',
    locationAr: initialData.locationAr || '',
    defaultSeoTitleEn: initialData.defaultSeoTitleEn || '',
    defaultSeoTitleAr: initialData.defaultSeoTitleAr || '',
    defaultSeoDescEn: initialData.defaultSeoDescEn || '',
    defaultSeoDescAr: initialData.defaultSeoDescAr || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('saving');
    setErrorMessage('');

    try {
      const result = await updateSettings(formData);
      if (result.success) {
        setStatus('success');
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch (err: unknown) {
      console.error(err);
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'An unknown error occurred');
    }
  };

  return (
    <div className="px-6 md:px-12 lg:px-24 py-12 mb-24">
      <div className="flex flex-col md:flex-row md:justify-between md:items-end pb-8 border-b border-white/10 gap-6 mb-12">
        <div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase font-heading text-white">Site Settings</h1>
          <div className="w-16 h-1 bg-amber-500 rounded-full mt-6"></div>
          <p className="mt-4 text-sm font-bold uppercase tracking-widest text-zinc-500">Manage contact information, social links, and global SEO.</p>
        </div>
        <button
          onClick={handleSubmit}
          disabled={status === 'saving'}
          className="inline-flex items-center gap-3 rounded bg-amber-500 px-6 py-3 text-sm font-bold uppercase tracking-widest text-black shadow-sm hover:bg-amber-400 disabled:opacity-50 transition-colors"
        >
          {status === 'saving' && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          {status === 'success' ? 'Saved!' : 'Save Settings'}
        </button>
      </div>

      {status === 'error' && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-md flex items-start">
          <AlertCircle className="w-5 h-5 mr-3 shrink-0 mt-0.5" />
          <p className="text-sm">{errorMessage}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <section className="space-y-12 border-b border-white/10 pb-12">
          <h2 className="text-2xl font-bold uppercase tracking-wider font-heading text-white mb-6">Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="bg-transparent border-b border-white/20 px-0 py-4 text-white focus:outline-none focus:border-amber-500 sm:text-sm sm:leading-6 w-full"
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Phone Number</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="bg-transparent border-b border-white/20 px-0 py-4 text-white focus:outline-none focus:border-amber-500 sm:text-sm sm:leading-6 w-full"
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">WhatsApp Number (include country code)</label>
              <input
                type="text"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                placeholder="e.g. +1234567890"
                className="bg-transparent border-b border-white/20 px-0 py-4 text-white focus:outline-none focus:border-amber-500 sm:text-sm sm:leading-6 w-full"
              />
            </div>
          </div>
        </section>

        <section className="space-y-12 border-b border-white/10 pb-12">
          <h2 className="text-2xl font-bold uppercase tracking-wider font-heading text-white mb-6">Location</h2>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Location (English)</label>
              <input
                type="text"
                name="locationEn"
                value={formData.locationEn}
                onChange={handleChange}
                className="bg-transparent border-b border-white/20 px-0 py-4 text-white focus:outline-none focus:border-amber-500 sm:text-sm sm:leading-6 w-full"
              />
            </div>
            <div dir="rtl">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2 text-right">الموقع (عربي)</label>
              <input
                type="text"
                name="locationAr"
                value={formData.locationAr}
                onChange={handleChange}
                className="bg-transparent border-b border-white/20 px-0 py-4 text-white focus:outline-none focus:border-amber-500 sm:text-sm sm:leading-6 w-full text-right"
              />
            </div>
          </div>
        </section>

        <section className="space-y-12 border-b border-white/10 pb-12">
          <h2 className="text-2xl font-bold uppercase tracking-wider font-heading text-white mb-6">Social Media Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Instagram URL</label>
              <input
                type="url"
                name="instagram"
                value={formData.instagram}
                onChange={handleChange}
                className="bg-transparent border-b border-white/20 px-0 py-4 text-white focus:outline-none focus:border-amber-500 sm:text-sm sm:leading-6 w-full"
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">YouTube Channel URL</label>
              <input
                type="url"
                name="youtube"
                value={formData.youtube}
                onChange={handleChange}
                className="bg-transparent border-b border-white/20 px-0 py-4 text-white focus:outline-none focus:border-amber-500 sm:text-sm sm:leading-6 w-full"
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Vimeo Profile URL</label>
              <input
                type="url"
                name="vimeo"
                value={formData.vimeo}
                onChange={handleChange}
                className="bg-transparent border-b border-white/20 px-0 py-4 text-white focus:outline-none focus:border-amber-500 sm:text-sm sm:leading-6 w-full"
              />
            </div>
          </div>
        </section>

        <section className="space-y-12 border-b border-white/10 pb-12">
          <h2 className="text-2xl font-bold uppercase tracking-wider font-heading text-white mb-6">Global SEO Defaults</h2>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Default Meta Title (English)</label>
              <input
                type="text"
                name="defaultSeoTitleEn"
                value={formData.defaultSeoTitleEn}
                onChange={handleChange}
                className="bg-transparent border-b border-white/20 px-0 py-4 text-white focus:outline-none focus:border-amber-500 sm:text-sm sm:leading-6 w-full"
              />
            </div>
            <div dir="rtl">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2 text-right">عنوان الميتا الافتراضي (عربي)</label>
              <input
                type="text"
                name="defaultSeoTitleAr"
                value={formData.defaultSeoTitleAr}
                onChange={handleChange}
                className="bg-transparent border-b border-white/20 px-0 py-4 text-white focus:outline-none focus:border-amber-500 sm:text-sm sm:leading-6 w-full text-right"
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Default Meta Description (English)</label>
              <textarea
                name="defaultSeoDescEn"
                value={formData.defaultSeoDescEn}
                onChange={handleChange}
                rows={3}
                className="bg-transparent border-b border-white/20 px-0 py-4 text-white focus:outline-none focus:border-amber-500 sm:text-sm sm:leading-6 w-full"
              />
            </div>
            <div dir="rtl">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2 text-right">وصف الميتا الافتراضي (عربي)</label>
              <textarea
                name="defaultSeoDescAr"
                value={formData.defaultSeoDescAr}
                onChange={handleChange}
                rows={3}
                className="bg-transparent border-b border-white/20 px-0 py-4 text-white focus:outline-none focus:border-amber-500 sm:text-sm sm:leading-6 w-full text-right"
              />
            </div>
          </div>
        </section>
      </form>
    </div>
  );
}
