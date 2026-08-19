# YouTube Media Workflow
1. Owner uploads finished video to YouTube.
2. Opens Admin Project Editor.
3. Pastes YouTube URL.
4. System validates supported URL.
5. Extracts video ID.
6. Shows preview.
7. Owner adds project metadata/poster.
8. Saves draft or publishes.
9. Public page uses safe generated embed.

Store URL + extracted ID, never raw iframe HTML. Use poster-first/lite/click-to-load embeds so Work grids do not load many YouTube iframes. Prefer owner-uploaded art-directed thumbnails; YouTube thumbnail can be an explicit fallback.
