# 02. Visual Identity and UI/UX Design

## 1. Aesthetic Direction: "Cinematic Modernism"
The portfolio must feel like a premium piece of software or a high-end editorial magazine, reflecting the quality of cinematic post-production.

- **Theme:** Dark Mode by default (to make video content pop).
- **Vibe:** Minimalist, bold, precise, and immersive.
- **Key Concepts:** Large typography, negative space, subtle glowing accents (to represent color grading), and glassmorphic overlays.

## 2. Color Palette
Instead of flat black and yellow, we will use a refined palette:

- **Background (Base):** OLED Black `#000000` or extremely dark gray `#050505` to provide infinite contrast for videos.
- **Surface (Cards/Overlays):** Translucent White `rgba(255, 255, 255, 0.05)` with background-blur for depth.
- **Primary Text:** Off-White `#F2F2F2` (reduces eye strain compared to pure white).
- **Secondary Text:** Muted Slate `#888888`.
- **Accent/Brand Color:** Electric Amber `#FFB800` or Neon Cyan `#00F0FF` (used sparingly for active states, link hovers, and primary buttons).

## 3. Typography
Typography needs to do the heavy lifting in a minimalist design.

- **English (Primary Font):** *Inter*, *Outfit*, or *Clash Display*. (Clash Display for massive, impactful Headings; Inter for highly readable body copy).
- **Arabic (Primary Font):** *Cairo* or *Tajawal* for modern, geometric readability that matches the English sans-serif style.
- **Scale:** Use an exaggerated typographic scale. Hero text should be massive (`text-7xl` or `text-9xl` in Tailwind), juxtaposed with tight, small metadata text (`text-sm` uppercase, wide tracking).

## 4. Micro-Interactions & Animations
Animations should feel 60fps, buttery smooth, and intentional (not distracting).

- **Page Transitions:** Fade-in and slight slide-up using `framer-motion` when navigating between routes.
- **Hover States:** 
  - *Images/Videos:* Slight scale up (1.05x) with a refined easing curve, revealing a subtle play button or metadata.
  - *Links:* Magnetic hover effects or underline-reveals on text links.
- **Scroll Effects:** 
  - Parallax on the hero video background.
  - Text-reveal animations (words masking in from the bottom) as the user scrolls down to the About or Work sections.
- **Custom Cursor (Optional):** A small, custom cursor dot that expands when hovering over clickable project thumbnails.

## 5. UI/UX Refinements over satar.me
- **Navigation:** Instead of a static block, use a floating, pill-shaped glassmorphic navigation bar that shrinks slightly on scroll.
- **Contact Form:** Use "floating labels" for inputs. When focused, the input bottom border should highlight in the Accent Color.
- **Project Display:** Instead of standard grid gaps, consider a "masonry" layout or an edge-to-edge grid with zero gaps, where the border lines are 1px translucent lines for a highly structured, brutalist-inspired look.
