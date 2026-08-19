# Content & Data Model
## User
Owner-admin authentication identity. Start simple; do not invent complex RBAC without need.

## PageContent
`pageKey`, `locale`, structured section fields/content, `updatedAt`, `updatedBy`.

## Project
`id`, unique stable `slug`, `titleEn`, `titleAr`, `descriptionEn`, `descriptionAr`, optional client/year, `youtubeUrl`, `youtubeVideoId`, `thumbnailUrl`, localized alt text, `featured`, `published`, `sortOrder`, timestamps.

## SiteSettings
Editable contact/social/location/default SEO fields in EN/AR where appropriate.

## Category/Service
Create only if real taxonomy/filtering is required. Localized names and stable slug.

## MediaAsset
For images/posters only: storage URL/key, MIME, dimensions, alt metadata, timestamps.

## Publishing
Draft projects never appear in public queries. Changing a title must not silently break a stable project URL.
