# Phase 03 Database Implementation Plan

## Goal
To implement the Phase 03 Content Database and Admin Authentication architecture using Prisma v7.

## What has been done
1. Upgraded Prisma to version 7.9.1.
2. Created a new Antigravity Skill at `.agents/skills/prisma-v7/SKILL.md` to document the Prisma 7 configuration differences (e.g. `prisma.config.ts`, driver adapters, and `prisma dev` local Postgres).
3. Created `prisma.config.ts` and updated `schema.prisma` to conform to Prisma 7 standards.

## Issue with Local PostgreSQL Migration
During the initial attempt to run `prisma migrate dev` using the Prisma 7 local development database (`prisma dev`), Prisma failed to connect to its internally generated shadow database (port 51214). This is likely an environmental limitation or a bug in the new `prisma dev` command running in this sandbox.

> [!WARNING]
> Since this sandbox environment does not have a native PostgreSQL server installed, and Docker is unavailable, the `prisma dev` command is the only way to run Postgres locally. If it fails to spawn the shadow database, we cannot run migrations using PostgreSQL.

## Proposed Options

Please approve one of the following approaches:

### Option A: Use SQLite locally (Recommended for Sandbox)
We configure Prisma to use `sqlite` instead of `postgresql` for development. This allows us to complete all Phase 03 data modeling, admin authentication, and tests locally without being blocked by PostgreSQL daemon issues. You can swap the provider back to `postgresql` when deploying to your real hosting environment (e.g., Vercel + Neon).

### Option B: Continue Debugging Prisma Dev
I can attempt to bypass the shadow database issue by manually configuring the `shadowDatabaseUrl` in `.env` to point to the main port, or by trying to connect an external PostgreSQL database if you can provide a valid connection string.

---

### Additional Phase 03 Steps (Once DB is resolved):
1. **Schema**: Create the `User`, `Project`, `PageContent`, and `SiteSettings` models.
2. **Auth**: Implement `jose` (JWT) and `bcryptjs` for Owner authentication.
3. **Admin Shell**: Create `/admin/login` and `/admin` routes.
4. **Server Actions**: Implement protected server actions to mutate the database.
5. **Testing**: Add security and functionality tests to verify the authentication flows.
