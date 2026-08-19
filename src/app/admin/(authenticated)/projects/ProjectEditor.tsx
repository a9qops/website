'use client';

import { useState, useRef } from 'react';
import { saveProject, uploadMedia } from './actions';
import { useRouter } from 'next/navigation';
import { extractYouTubeVideoId } from '@/lib/youtube';
import { Loader2, AlertCircle } from 'lucide-react';
import type { Project } from '@prisma/client';

export default function ProjectEditor({ initialData = {} }: { initialData?: Partial<Project> }) {
  const router = useRouter();
  const [status, setStatus] = useState<'idle' | 'saving' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  
  const [formData, setFormData] = useState({
    id: initialData.id || '',
    titleEn: initialData.titleEn || '',
    titleAr: initialData.titleAr || '',
    slug: initialData.slug || '',
    descriptionEn: initialData.descriptionEn || '',
    descriptionAr: initialData.descriptionAr || '',
    client: initialData.client || '',
    year: initialData.year || '',
    youtubeUrl: initialData.youtubeUrl || '',
    posterUrl: initialData.posterUrl || '',
    posterAltEn: initialData.posterAltEn || '',
    posterAltAr: initialData.posterAltAr || '',
    featured: initialData.featured || false,
    published: initialData.published || false,
    sortOrder: initialData.sortOrder || 0,
  });

  const [previewYoutubeId, setPreviewYoutubeId] = useState<string | null>(
    initialData.youtubeVideoId || extractYouTubeVideoId(initialData.youtubeUrl || '')
  );



  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
      
      if (name === 'youtubeUrl') {
        const id = extractYouTubeVideoId(value);
        setPreviewYoutubeId(id);
      }
    }
  };

  const generateSlug = () => {
    if (!formData.titleEn) return;
    const slug = formData.titleEn
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    setFormData(prev => ({ ...prev, slug }));
  };



  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('saving');
    setErrorMessage('');

    const res = await saveProject(formData);

    if (res.success) {
      router.push('/admin/projects');
      router.refresh();
    } else {
      setStatus('error');
      setErrorMessage(res.error || 'Failed to save project');
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-end pb-8 border-b border-white/10 gap-6">
        <div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase font-heading text-white">
            {formData.id ? 'Edit Project' : 'New Project'}
          </h2>
          <div className="w-16 h-1 bg-amber-500 rounded-full mt-6"></div>
        </div>
        <div className="flex gap-4 items-center">
          <button
            type="button"
            onClick={() => router.push('/admin/projects')}
            className="text-sm font-bold uppercase tracking-widest leading-6 text-zinc-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={status === 'saving'}
            className="inline-flex justify-center items-center gap-2 rounded bg-amber-500 px-6 py-3 text-sm font-bold uppercase tracking-widest text-black shadow-sm hover:bg-amber-400 disabled:opacity-50 transition-colors"
          >
            {status === 'saving' && <Loader2 className="h-4 w-4 animate-spin" />}
            {status === 'saving' ? 'Saving...' : 'Save Project'}
          </button>
        </div>
      </div>

      {status === 'error' && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-red-400" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{errorMessage}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Basic Info */}
          <div className="space-y-12 border-b border-white/10 pb-12">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Title (EN)</label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="titleEn"
                    required
                    value={formData.titleEn}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-white/20 px-0 py-4 text-white focus:outline-none focus:border-amber-500 placeholder:text-zinc-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div dir="rtl">
                <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">العنوان (AR)</label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="titleAr"
                    required
                    value={formData.titleAr}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-white/20 px-0 py-4 text-white focus:outline-none focus:border-amber-500 placeholder:text-zinc-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2 block">Slug</label>
              <div className="mt-2 flex items-center border-b border-white/20 focus-within:border-amber-500 transition-colors">
                <span className="text-zinc-500 sm:text-sm sm:leading-6 pr-1 font-mono">
                  /work/
                </span>
                <input
                  type="text"
                  name="slug"
                  required
                  value={formData.slug}
                  onChange={handleChange}
                  className="w-full bg-transparent px-0 py-4 text-white focus:outline-none placeholder:text-zinc-600 sm:text-sm sm:leading-6 font-mono"
                />
                <button
                  type="button"
                  onClick={generateSlug}
                  className="shrink-0 ml-4 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-amber-500 hover:bg-amber-500/10 transition-colors border border-amber-500/30 rounded"
                >
                  Generate
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Description (EN)</label>
                <div className="mt-2">
                  <textarea
                    name="descriptionEn"
                    rows={4}
                    value={formData.descriptionEn}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-white/20 px-0 py-4 text-white focus:outline-none focus:border-amber-500 placeholder:text-zinc-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div dir="rtl">
                <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">الوصف (AR)</label>
                <div className="mt-2">
                  <textarea
                    name="descriptionAr"
                    rows={4}
                    value={formData.descriptionAr}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-white/20 px-0 py-4 text-white focus:outline-none focus:border-amber-500 placeholder:text-zinc-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Client / Brand</label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="client"
                    value={formData.client}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-white/20 px-0 py-4 text-white focus:outline-none focus:border-amber-500 placeholder:text-zinc-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Year</label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-white/20 px-0 py-4 text-white focus:outline-none focus:border-amber-500 placeholder:text-zinc-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* YouTube Media */}
          <div className="space-y-12 border-b border-white/10 pb-12">
            <h3 className="text-2xl font-bold uppercase tracking-wider font-heading text-white mb-6">Media</h3>
            
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">YouTube URL</label>
              <div className="mt-2">
                <input
                  type="url"
                  name="youtubeUrl"
                  value={formData.youtubeUrl}
                  onChange={handleChange}
                  placeholder="https://youtube.com/watch?v=..."
                  className="w-full bg-transparent border-b border-white/20 px-0 py-4 text-white focus:outline-none focus:border-amber-500 placeholder:text-zinc-600 sm:text-sm sm:leading-6"
                />
              </div>
              {formData.youtubeUrl && !previewYoutubeId && (
                <p className="mt-2 text-sm text-red-600">Invalid YouTube URL. Cannot extract video ID.</p>
              )}
            </div>

            {previewYoutubeId && (
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2 mb-2">Video Preview</p>
                <div className="aspect-video w-full rounded-lg overflow-hidden bg-black ring-1 ring-zinc-300">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${previewYoutubeId}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-8">
          {/* Publishing Settings */}
          <div className="space-y-12 border-b border-white/10 pb-12">
            <h3 className="text-2xl font-bold uppercase tracking-wider font-heading text-white mb-6">Publishing</h3>
            
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                name="published"
                id="published"
                checked={formData.published}
                onChange={handleChange}
                className="h-5 w-5 rounded border-white/20 bg-transparent text-amber-500 focus:ring-amber-500 focus:ring-offset-black"
              />
              <label htmlFor="published" className="text-sm font-bold uppercase tracking-widest text-white">
                Published to public site
              </label>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                name="featured"
                id="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="h-5 w-5 rounded border-white/20 bg-transparent text-amber-500 focus:ring-amber-500 focus:ring-offset-black"
              />
              <label htmlFor="featured" className="text-sm font-bold uppercase tracking-widest text-white">
                Featured (shows on Home)
              </label>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Sort Order</label>
              <p className="text-xs text-zinc-500 mb-2">Lower numbers appear first.</p>
              <div className="mt-2">
                <input
                  type="number"
                  name="sortOrder"
                  value={formData.sortOrder}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-white/20 px-0 py-4 text-white focus:outline-none focus:border-amber-500 placeholder:text-zinc-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>

          {/* Poster Upload */}
          <div className="space-y-12 border-b border-white/10 pb-12">
            <h3 className="text-2xl font-bold uppercase tracking-wider font-heading text-white mb-6">Poster Image</h3>
            
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Poster Image URL</label>
              <div className="mt-2">
                <input
                  type="url"
                  name="posterUrl"
                  value={formData.posterUrl}
                  onChange={handleChange}
                  placeholder="https://raw.githubusercontent.com/..."
                  className="w-full bg-transparent border-b border-white/20 px-0 py-4 text-white focus:outline-none focus:border-amber-500 placeholder:text-zinc-600 sm:text-sm sm:leading-6"
                />
              </div>
              <p className="text-xs text-zinc-500 mt-2">Enter the direct URL to the image (e.g., from GitHub).</p>
            </div>

            {formData.posterUrl && (
              <div className="mt-6 rounded-lg overflow-hidden border border-white/10 bg-zinc-900">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={formData.posterUrl} 
                  alt="Poster preview" 
                  className="w-full h-auto object-cover max-h-64"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMzMzMiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZmlsbD0iIzY2NiIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkludmFsaWQgSW1hZ2UgVVJMPC90ZXh0Pjwvc3ZnPg==';
                  }}
                />
              </div>
            )}

            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Alt Text (EN)</label>
              <div className="mt-2">
                <input
                  type="text"
                  name="posterAltEn"
                  value={formData.posterAltEn}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-white/20 px-0 py-4 text-white focus:outline-none focus:border-amber-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div dir="rtl">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">النص البديل (AR)</label>
              <div className="mt-2">
                <input
                  type="text"
                  name="posterAltAr"
                  value={formData.posterAltAr}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-white/20 px-0 py-4 text-white focus:outline-none focus:border-amber-500 sm:text-sm sm:leading-6 text-right"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
