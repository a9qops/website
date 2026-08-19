# 01. Overview and Requirements

## 1. Project Goal
The objective is to build a premium, high-performance portfolio website for a post-production studio (or individual creative), heavily inspired by the structure and content layout of `satar.me`. The new site will retain the core navigational elements and multi-language support (English/Arabic) but will introduce a significantly upgraded visual identity, smoother micro-interactions, and a modern, high-performance web architecture.

## 2. Target Audience
- **Primary:** High-end commercial clients, film directors, advertising agencies, and brands looking for top-tier cinematic post-production services.
- **Secondary:** Other creatives, designers, and editors looking for inspiration or collaboration.
- **User Persona Needs:** They need to see the work immediately, experience a sense of quality through the UI, and easily find contact information. Performance must be flawless; a stuttering video portfolio immediately harms credibility.

## 3. Core Features & Page Structure

### 3.1. Global Elements
- **Navigation Bar:** Logo on the left, centered navigation links (Home, About, Work, Contact), social links (Vimeo, Instagram), and a Language Switcher (EN/AR) on the right. Must support a glassmorphic or blur-backdrop effect on scroll.
- **Localization (i18n):** Full support for English (LTR) and Arabic (RTL). Changing the language should flip the layout seamlessly and update all typography to a specialized Arabic font (e.g., Cairo or Tajawal).

### 3.2. Page: Home
- **Hero Section:** Full-screen background video (auto-playing, muted, looping) with a bold, oversized typography overlay (e.g., "#1 POST-PRODUCTION STUDIO").
- **Dynamic Work Teaser:** A seamless scroll transition into a masonry or horizontal-scroll grid of recent, high-profile projects.
- **Footer CTA:** A clean, bold call-to-action leading to the Contact page.

### 3.3. Page: About
- **Studio Profile:** A striking layout combining professional photography (e.g., portrait of the founder/team) with high-contrast text detailing the studio's specialization (editing, color grading, VFX).
- **Services Breakdown:** A minimalist grid or accordion detailing specific offerings.

### 3.4. Page: Work (Portfolio)
- **Project Grid:** The core of the site. A highly responsive grid layout showing project thumbnails. Hovering over thumbnails should trigger a micro-interaction (e.g., playing a short preview video or a smooth zoom effect).
- **Project Detail View:** Clicking a project transitions to a dedicated project page featuring a large embedded video player (Vimeo/YouTube), project title, client name, services provided, and a brief description.

### 3.5. Page: Contact
- **Contact Form:** A streamlined, interactive form (Name, Email, Project Type, Message) with clear validation styling.
- **Direct Contact Info:** Readily available location details, email, phone number, and a direct WhatsApp chat link.

## 4. Inspiration vs. Evolution (Compared to satar.me)

| Feature | Satar.me (Current) | Our Evolution (Target) |
| :--- | :--- | :--- |
| **Visual Style** | Standard dark theme with basic typography. | Deep, premium dark mode (e.g., OLED black) with subtle glassmorphism, accent glows, and variable modern typography. |
| **Animations** | Basic scrolling and simple hovers. | Fluid page transitions, parallax scrolling, custom cursor interactions, and layout animations using Framer Motion. |
| **Performance** | Standard load times; video handling is okay. | Next.js SSG with optimized edge-delivered media, zero layout shift, and immediate initial load metrics. |
| **RTL Support** | Functional structural flip. | Perfected RTL typography pairing and mirrored custom animations for a native feel in both languages. |
