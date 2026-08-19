// No getTranslations needed

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const { locale } = await params;
  return {
    title: `Brand Playground | ${locale.toUpperCase()}`,
  };
}

export default async function PlaygroundPage() {
  return (
    <div className="w-full max-w-7xl mx-auto space-y-12 pb-32">
      <header className="space-y-4 border-b border-surface pb-12">
        <h1 className="text-4xl md:text-6xl font-heading font-black tracking-tighter uppercase">
          Brand Playground
        </h1>
        <p className="text-xl text-muted font-mono">
          [01] VISUAL IDENTITY & RESPONSIVE VERIFICATION
        </p>
      </header>

      <section className="space-y-8">
        <h2 className="text-2xl font-bold uppercase tracking-widest border-b border-surface pb-4">
          Typography
        </h2>
        <div className="space-y-12">
          <div className="space-y-2">
            <p className="text-sm text-muted font-mono">Heading / Display</p>
            <h1 className="text-6xl md:text-8xl font-heading font-black uppercase tracking-tighter">
              Editorial Timeline
            </h1>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted font-mono">Heading / Secondary</p>
            <h2 className="text-4xl md:text-5xl font-heading font-bold uppercase tracking-tight">
              Cinematic Motion
            </h2>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted font-mono">Body / Sans</p>
            <p className="text-lg md:text-xl text-zinc-300 font-sans max-w-2xl leading-relaxed">
              This is the body copy. It is designed to be highly readable. A high-end film-title-sequence/editorial-magazine identity inspired by the language of professional editing—without imitating editing software.
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted font-mono">Metadata / Mono</p>
            <p className="text-base text-muted font-mono uppercase tracking-widest">
              TC: 01:23:45:12 // PROJ_001
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-bold uppercase tracking-widest border-b border-surface pb-4">
          Color Palette
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="space-y-3">
            <div className="h-32 rounded-lg bg-background border border-surface"></div>
            <div>
              <p className="font-bold">Ink</p>
              <p className="text-sm text-muted font-mono">--background</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="h-32 rounded-lg bg-foreground border border-surface"></div>
            <div>
              <p className="font-bold text-background">Text</p>
              <p className="text-sm text-muted font-mono">--foreground</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="h-32 rounded-lg bg-surface border border-glass"></div>
            <div>
              <p className="font-bold">Graphite</p>
              <p className="text-sm text-muted font-mono">--surface</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="h-32 rounded-lg bg-accent"></div>
            <div>
              <p className="font-bold text-accent">Accent</p>
              <p className="text-sm text-muted font-mono">--accent</p>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-bold uppercase tracking-widest border-b border-surface pb-4">
          Primitives & Motifs
        </h2>
        
        <div className="space-y-12">
          {/* Timeline Rule */}
          <div className="space-y-4">
            <p className="text-sm text-muted font-mono">Timeline Rule</p>
            <div className="h-px bg-surface relative w-full">
              <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-accent -translate-y-1/2 rounded-full"></div>
              <div className="absolute top-1/2 left-3/4 w-1 h-3 bg-muted -translate-y-1/2"></div>
            </div>
          </div>

          {/* Film Frame Window */}
          <div className="space-y-4">
            <p className="text-sm text-muted font-mono">Film Frame Window / Button</p>
            <button className="relative group overflow-hidden border border-surface px-8 py-4 bg-surface/30 hover:bg-surface transition-colors duration-500">
              <span className="relative z-10 font-bold uppercase tracking-widest text-sm text-white group-hover:text-accent transition-colors duration-500">
                Play Sequence
              </span>
              <div className="absolute inset-0 border-x-4 border-transparent group-hover:border-accent/20 transition-all duration-500"></div>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
