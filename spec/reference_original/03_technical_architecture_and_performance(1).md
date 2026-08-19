# 03. Technical Architecture and Performance

## 1. Technology Stack
To achieve the requirement of "better performance" while supporting robust features, the following modern web stack is prescribed:

- **Framework:** **Next.js (App Router)**
  - *Why:* Provides excellent SEO, automatic code splitting, layout persistence (crucial for smooth page transitions), and built-in optimization for images and fonts.
- **Styling:** **Tailwind CSS**
  - *Why:* Utility-first approach ensures a tiny CSS bundle. We will extend the Tailwind config to include our custom color palette and typography scales.
- **Animations:** **Framer Motion**
  - *Why:* Industry standard for complex, declarative React animations (page transitions, scroll reveals, layout animations) while maintaining good performance.
- **Localization (i18n):** **next-intl** or native Next.js i18n routing.
  - *Why:* Simplifies managing dictionaries (JSON files for EN/AR) and handling RTL layout direction based on the current locale.
- **Content Management:** **Local MDX / JSON** (Initial Phase)
  - *Why:* For a portfolio of this size, a headless CMS is often overkill and slows down initial development. Storing project data in local JSON or MDX files ensures instant data resolution at build time (SSG).

## 2. Performance Optimization Strategy
A portfolio heavy on video and images *must* employ aggressive optimization techniques to score highly on Lighthouse and feel instant.

### 2.1. Media Optimization
- **Video Backgrounds:** 
  - Do not use YouTube/Vimeo for the *background* hero video, as iframe loading blocks the main thread.
  - Self-host a highly compressed `<video>` element (WebM format with MP4 fallback), muted, looping, and without audio tracks. Max size: 2-3MB.
- **Images:** 
  - Strictly use Next.js `<Image>` component (`next/image`).
  - Automatically serve WebP/AVIF formats.
  - Enforce `placeholder="blur"` (blur-up) for all project thumbnails to prevent Layout Shifts (CLS) while images load.

### 2.2. Rendering & Code Splitting
- **Static Site Generation (SSG):** Almost all pages (Home, About, Work) should be statically generated at build time. There is no need for Server-Side Rendering (SSR) per request unless dynamic personalization is added later.
- **Font Loading:** Use `next/font/google` to host fonts locally. This removes network round-trips to Google Fonts and eliminates Cumulative Layout Shift (CLS) via `size-adjust`.

### 2.3. SEO & Metadata
- **Dynamic Metadata:** Utilize Next.js `generateMetadata` API to inject proper Open Graph (OG) tags and Twitter cards for every specific project detail page, ensuring rich previews when shared on social media.
- **Sitemap & Robots:** Automatically generate `sitemap.xml` and `robots.txt` based on the project data.

## 3. Hosting & Deployment
- **Platform:** **Vercel**
  - *Why:* Native Next.js support, edge caching, image optimization at the edge, and instant CI/CD pipeline from GitHub.
