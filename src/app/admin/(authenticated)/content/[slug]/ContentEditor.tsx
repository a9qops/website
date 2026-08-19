'use client';

import { useState, useEffect } from 'react';
import { updatePageContent } from '../actions';
import { Loader2, AlertCircle } from 'lucide-react';
import type { PageContent } from '@prisma/client';

const PAGE_SCHEMAS: Record<string, { key: string; label: string; type: 'text' | 'textarea' }[]> = {
  home: [
    { key: 'heroEyebrow', label: 'Hero Eyebrow', type: 'text' },
    { key: 'heroHeadline', label: 'Hero Headline', type: 'textarea' },
    { key: 'heroIntro', label: 'Hero Introduction', type: 'textarea' },
    { key: 'heroCta', label: 'Hero CTA Label', type: 'text' },
    { key: 'featuredHeading', label: 'Featured Work Heading', type: 'text' },
    { key: 'featuredCopy', label: 'Featured Work Copy', type: 'textarea' },
  ],
  about: [
    { key: 'eyebrow', label: 'Eyebrow', type: 'text' },
    { key: 'heading', label: 'Heading', type: 'text' },
    { key: 'biography', label: 'Biography', type: 'textarea' },
    { key: 'secondaryStatement', label: 'Secondary Statement', type: 'textarea' },
  ],
  services: [
    { key: 'heading', label: 'Heading', type: 'text' },
    { key: 'introduction', label: 'Introduction', type: 'textarea' },
  ],
  contact: [
    { key: 'heading', label: 'Heading', type: 'text' },
    { key: 'introduction', label: 'Introduction', type: 'textarea' },
    { key: 'ctaCopy', label: 'CTA Support Copy', type: 'textarea' },
  ],
};

export default function ContentEditor({ initialData = {} }: { initialData?: Partial<PageContent> }) {
  const schema = PAGE_SCHEMAS[initialData.pageSlug as string] || [];
  
  // Parse existing JSON or default to empty object
  let parsedEn = {};
  let parsedAr = {};
  try { parsedEn = JSON.parse(initialData.contentEn as string); } catch {}
  try { parsedAr = JSON.parse(initialData.contentAr as string); } catch {}

  const [formData, setFormData] = useState({
    titleEn: initialData.titleEn || '',
    titleAr: initialData.titleAr || '',
    en: parsedEn as Record<string, string>,
    ar: parsedAr as Record<string, string>,
  });

  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [isDirty, setIsDirty] = useState(false);

  // Warn on unmount if dirty
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty]);

  const handleChange = (locale: 'en' | 'ar', key: string, value: string) => {
    setIsDirty(true);
    setStatus('idle');
    setFormData(prev => ({
      ...prev,
      [locale]: {
        ...prev[locale],
        [key]: value
      }
    }));
  };

  const handleTitleChange = (locale: 'en' | 'ar', value: string) => {
    setIsDirty(true);
    setStatus('idle');
    setFormData(prev => ({
      ...prev,
      [locale === 'en' ? 'titleEn' : 'titleAr']: value
    }));
  };

  const handleSave = async () => {
    setStatus('saving');
    setErrorMessage('');
    
    const payload = {
      pageSlug: initialData.pageSlug,
      titleEn: formData.titleEn,
      titleAr: formData.titleAr,
      contentEn: JSON.stringify(formData.en),
      contentAr: JSON.stringify(formData.ar),
    };

    const res = await updatePageContent(payload);
    
    if (res.success) {
      setStatus('saved');
      setIsDirty(false);
    } else {
      setStatus('error');
      setErrorMessage(res.error || 'Failed to save content');
    }
  };

  return (
    <div className="flex flex-col mb-24">
      {/* Editor Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-end pb-8 border-b border-white/10 gap-6 mt-12 mb-12">
        <div className="flex items-center gap-4">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase font-heading text-white">Content Editor</h2>
          {isDirty && <span className="inline-flex items-center rounded-none bg-yellow-500/10 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-yellow-400 ring-1 ring-inset ring-yellow-500/20">Unsaved</span>}
          {status === 'saved' && <span className="inline-flex items-center rounded-none bg-green-500/10 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-green-400 ring-1 ring-inset ring-green-500/20">Saved</span>}
        </div>
        <div className="flex items-center gap-6">
          <a
            href={`/${initialData.pageSlug === 'home' ? '' : initialData.pageSlug}`}
            target="_blank"
            className="text-sm font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors"
          >
            Preview Site &nearr;
          </a>
          <button
            onClick={handleSave}
            disabled={!isDirty || status === 'saving'}
            className="inline-flex items-center gap-3 rounded bg-amber-500 px-6 py-3 text-sm font-bold uppercase tracking-widest text-black shadow-sm hover:bg-amber-400 disabled:opacity-50 transition-colors"
          >
            {status === 'saving' && <Loader2 className="h-4 w-4 animate-spin" />}
            {status === 'saving' ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      {status === 'error' && (
        <div className="p-4 bg-red-50 border-b border-red-200 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-medium text-red-800">Error saving content</h3>
            <p className="mt-1 text-sm text-red-700">{errorMessage}</p>
          </div>
        </div>
      )}

      {/* Editor Body */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        {/* English Column */}
        <div className="space-y-8">
          <div className="border-b border-amber-500/30 pb-4">
            <h4 className="text-2xl font-bold uppercase tracking-wider font-heading text-white">English (LTR)</h4>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2 block">Page Title</label>
              <input
                type="text"
                value={formData.titleEn}
                onChange={(e) => handleTitleChange('en', e.target.value)}
                className="block w-full bg-transparent border-b border-white/20 px-0 py-4 text-white focus:outline-none focus:border-amber-500 sm:text-sm sm:leading-6"
              />
            </div>

            {schema.map((field) => (
              <div key={`en-${field.key}`}>
                <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2 block">{field.label}</label>
                {field.type === 'textarea' ? (
                  <textarea
                    rows={4}
                    value={formData.en[field.key] || ''}
                    onChange={(e) => handleChange('en', field.key, e.target.value)}
                    className="block w-full bg-transparent border-b border-white/20 px-0 py-4 text-white focus:outline-none focus:border-amber-500 sm:text-sm sm:leading-6"
                  />
                ) : (
                  <input
                    type="text"
                    value={formData.en[field.key] || ''}
                    onChange={(e) => handleChange('en', field.key, e.target.value)}
                    className="block w-full bg-transparent border-b border-white/20 px-0 py-4 text-white focus:outline-none focus:border-amber-500 sm:text-sm sm:leading-6"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Arabic Column */}
        <div className="space-y-8">
          <div className="border-b border-amber-500/30 pb-4">
            <h4 className="text-2xl font-bold uppercase tracking-wider font-heading text-white text-right" dir="rtl">العربية (RTL)</h4>
          </div>
          
          <div className="space-y-6" dir="rtl">
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2 block">عنوان الصفحة</label>
              <input
                type="text"
                value={formData.titleAr}
                onChange={(e) => handleTitleChange('ar', e.target.value)}
                className="block w-full bg-transparent border-b border-white/20 px-0 py-4 text-white focus:outline-none focus:border-amber-500 sm:text-sm sm:leading-6 text-right"
              />
            </div>

            {schema.map((field) => (
              <div key={`ar-${field.key}`}>
                <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2 block">{field.label}</label>
                {field.type === 'textarea' ? (
                  <textarea
                    rows={4}
                    value={formData.ar[field.key] || ''}
                    onChange={(e) => handleChange('ar', field.key, e.target.value)}
                    className="block w-full bg-transparent border-b border-white/20 px-0 py-4 text-white focus:outline-none focus:border-amber-500 sm:text-sm sm:leading-6 text-right"
                  />
                ) : (
                  <input
                    type="text"
                    value={formData.ar[field.key] || ''}
                    onChange={(e) => handleChange('ar', field.key, e.target.value)}
                    className="block w-full bg-transparent border-b border-white/20 px-0 py-4 text-white focus:outline-none focus:border-amber-500 sm:text-sm sm:leading-6 text-right"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
