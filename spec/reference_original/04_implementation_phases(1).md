# 04. Implementation Phases

This document provides a step-by-step roadmap for developing the portfolio website, moving from foundational setup to final polish.

## Phase 1: Foundation & Design System Setup
*Goal: Establish the technical scaffolding and design tokens.*
1. **Initialize Project:** Create Next.js App Router project (`npx create-next-app@latest`).
2. **Install Dependencies:** Tailwind CSS, Framer Motion, next-intl, Lucide React (for icons).
3. **Configure Tailwind:** Set up the custom color palette (OLED black, translucent whites, accent colors) and typography scales in `tailwind.config.ts`.
4. **Setup i18n:** Implement localization routing structure (`/[locale]/layout.tsx`) and create initial `en.json` and `ar.json` dictionaries. Ensure the `<html>` tag dynamically receives `dir="ltr"` or `dir="rtl"`.
5. **Global Styles:** Create the root layout, defining base CSS (hidden scrollbars, global background color).

## Phase 2: Core Layout & Navigation
*Goal: Build the persistent elements that wrap all pages.*
1. **Navigation Component:** Build the floating, glassmorphic header.
   - Implement route linking (`<Link href="...">`).
   - Implement the Language Switcher toggle.
2. **Footer Component:** Build the simplified footer with social links and CTA.
3. **Responsive Testing:** Ensure Header and Footer scale correctly on mobile devices (e.g., implementing a hamburger menu for mobile if necessary, though a simple bottom tab-bar or clean flex-wrap might suffice).

## Phase 3: Page Assembly & Data Structure
*Goal: Build the static pages and the project grid.*
1. **Data Mocking:** Create a `data/projects.json` file to store dummy portfolio data (id, title, client, description, thumbnail path, vimeoId).
2. **Home Page:** 
   - Implement the Hero section with the optimized, self-hosted background video.
   - Implement a featured projects snippet grid.
3. **About Page:** 
   - Build the layout combining text and the studio image.
4. **Work Page (Portfolio Grid):** 
   - Map over the `projects.json` data to render thumbnail cards.
5. **Project Detail Page (Dynamic Route):** 
   - Create `app/[locale]/work/[id]/page.tsx`.
   - Implement a responsive video embed container for Vimeo/YouTube links.

## Phase 4: Animations & Interactions
*Goal: Elevate the visual identity through motion.*
1. **Page Transitions:** Wrap the main `<slot>` in a Framer Motion `<AnimatePresence>` for smooth fade/slide transitions on route change.
2. **Scroll Reveals:** Use Framer Motion's `whileInView` to add fade-up animations to text blocks in the About and Home pages as they enter the viewport.
3. **Hover States:** Apply scale transforms and opacity transitions to the Work grid thumbnails using Tailwind (`hover:scale-105 transition-transform duration-500`).

## Phase 5: Forms & Integrations
*Goal: Make the site functional.*
1. **Contact Page:** Build the interactive form.
2. **Form Handling:** Integrate a service like **Formspree** or **Resend** via Next.js Server Actions to handle form submissions without needing a dedicated backend. Add loading states and success toast notifications.

## Phase 6: Optimization, QA & Launch
*Goal: Achieve perfect Lighthouse scores and deploy.*
1. **Asset Optimization:** Compress all images to WebP. Compress the hero video using Handbrake or similar tools.
2. **Cross-Browser & Device Testing:** Verify the RTL layout flip works perfectly on iOS Safari, Chrome, and desktop browsers.
3. **SEO Pass:** Ensure all `<title>` and `<meta name="description">` tags are populated correctly for both languages.
4. **Deployment:** Push to GitHub and deploy to Vercel. Review performance metrics on the production build.
