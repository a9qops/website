# Owner Admin / CMS
## Dashboard
Real content status only: drafts, published projects, recent edits, New Project/Edit Page shortcuts. No fake analytics.

## Page editor
Structured EN/AR fields for Home/About/Services/Contact, validation, save, preview, dirty-state warning. Do not expose arbitrary scripts/raw HTML.

## Projects manager
Poster, title, state, featured, order, updated date, edit actions. Responsive dense desktop list and compact mobile list.

## Project editor
Localized title/description; stable slug; validated YouTube URL + preview; poster upload; optional real metadata; draft/publish; featured; ordering.

## Uploads
Upload images/posters, not finished videos. Validate MIME/size and store outside ephemeral production filesystem.

## Security
All mutations server-authorized. Keep updatedAt/updatedBy; richer revisions can be future work.
