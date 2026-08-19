# Master Product Specification
## Vision
Build a premium bilingual portfolio for a highly skilled professional video editor/post-production artist. It must feel authored, cinematic and editorial—not like a generic dark SaaS template.

Visitors should immediately perceive taste, quality of work, and a clear path to contact.

## Public surfaces
Home, Work, Project Detail, About, Services, Contact, EN/AR localization.

## Owner surfaces
Admin Login, Dashboard, Page Content Editor, Projects Manager, Project Editor, Site Settings.

## Owner-editable requirement
The owner must change public page text and publish new work without editing source code.

## Video workflow
Finished portfolio videos are uploaded to YouTube externally. In Admin, the owner pastes the YouTube URL. The system validates it, extracts/stores the video ID, previews it, and renders a safe public embed. Never accept arbitrary iframe HTML.

## Hero media
Hero background media is separate from portfolio embeds. Prefer an optimized self-hosted WebM/MP4 reel or poster-first treatment; do not load a heavy YouTube iframe as a full-screen autoplay background.

## Anti-generic identity
Reject generic glass-card dashboards, random neon gradients, excessive pills, gratuitous animations, and template-looking masonry. Let project imagery dominate.
