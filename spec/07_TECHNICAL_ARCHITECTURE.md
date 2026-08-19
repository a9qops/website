# Technical Architecture
Recommended: Next.js App Router, TypeScript, Tailwind CSS, Motion/Framer Motion, next-intl, PostgreSQL, Prisma, authenticated owner admin, durable object/image storage, YouTube for finished video hosting.

The old local JSON/MDX-only plan is superseded because runtime owner editing is now core scope.

Public pages should use server rendering/static revalidation where practical; admin is dynamic/authenticated. Revalidate affected public routes after publishing. Use `next/image`. Never rely on ephemeral server filesystem for production uploads.

Vercel is convenient but not mandatory; keep VPS/container deployment possible.
