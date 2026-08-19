# 05. Advanced Enhancements

To elevate the portfolio from a standard website to a premium, interactive experience, we are introducing the following advanced specifications (Phases 5 and 6).

## 1. Dynamic Project Filtering
- **Objective:** Allow users to instantly filter the portfolio grid on the Work page without full page reloads.
- **Specification:** 
  - Add a sleek, horizontal filter bar above the grid (e.g., "All", "Color Grading", "VFX", "Editing").
  - Use `framer-motion`'s `AnimatePresence` and `layout` props. When a filter is clicked, non-matching projects scale down and fade out (`opacity: 0, scale: 0.8`), while matching projects fluidly glide into their new grid positions.

## 2. Magnetic Custom Cursor
- **Objective:** Create a highly tactile, cinematic feel by overriding the default OS cursor.
- **Specification:**
  - A global cursor component using `framer-motion` spring physics to follow the mouse coordinates.
  - **Base State:** A small, white, inverted-blend-mode dot.
  - **Hover State (Links):** The dot expands slightly and becomes translucent.
  - **Hover State (Videos/Projects):** The cursor expands significantly into a circle and displays a text label (e.g., "PLAY" or "VIEW") in the center.

## 3. Custom Cinematic Video Player
- **Objective:** Remove distracting third-party branding (YouTube/Vimeo logos, titles, share buttons) to maintain absolute visual control over the presentation.
- **Specification:**
  - Build a custom React video player wrapper.
  - Controls should be minimalist: a simple play/pause toggle in the center, and a thin progress bar at the bottom.
  - Hovering over the video container reveals the controls; otherwise, they fade out completely.

## 4. WebGL / Canvas Hero Interaction (Optional Phase 6)
- **Objective:** Introduce a "wow" factor immediately upon loading the Home page.
- **Specification:**
  - Instead of a static video, use `react-three-fiber` to render a subtle, interactive background.
  - *Concept:* A fluid simulation or a cinematic lens distortion effect that subtly shifts based on mouse movement across the hero text.

## 5. Headless CMS Integration (Future Proofing)
- **Objective:** Allow studio editors to add projects without touching the codebase.
- **Specification:**
  - Architecture plan to migrate `projects.json` to **Sanity.io**.
  - Sanity will provide a visual dashboard. Next.js will fetch the data at build time (SSG) using `next-sanity`, ensuring performance remains identical to the static JSON approach.
