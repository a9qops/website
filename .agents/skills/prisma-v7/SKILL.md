---
name: prisma-v7
description: Use this skill when setting up, configuring, or debugging Prisma 7, especially with local development workflows like `prisma dev` and adapter usage.
---

# Prisma 7 Workflow & Guidelines

Prisma 7 introduces major changes to how the schema is configured and how the Prisma Client connects to the database.

## 1. Schema Configuration (`prisma.config.ts`)

In Prisma 7, you **must not** define the `url` directly inside the `schema.prisma` file. Move it to `prisma.config.ts`.

### Example `prisma/schema.prisma`:
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  // The `url` property is removed!
}
```

### Example `prisma.config.ts`:
```typescript
import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env["DATABASE_URL"],
  },
});
```

## 2. Local Database with `prisma dev`

Prisma 7 provides a built-in local Postgres database, removing the need for Docker.

1. **Start the Database**: Run `npx prisma dev` (or `npx prisma dev --detach` to run it in the background).
2. **Environment Variable**: The command provides a connection string starting with `prisma+postgres://`. Ensure this is set as `DATABASE_URL` in your `.env` file.
3. **Migrations**: While the `prisma dev` server is running, you can execute `npx prisma migrate dev` in a separate terminal to apply schema changes.

## 3. Prisma Client & Driver Adapters

For Postgres connections in Prisma 7, you must use a driver adapter.
You will need to install `pg` and `@prisma/adapter-pg`.

### Installation:
```bash
npm install pg @prisma/adapter-pg
npm install -D @types/pg
```

### Initialization:
```typescript
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

// Initialize the pg Pool
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Create the adapter
const adapter = new PrismaPg(pool);

// Pass the adapter to PrismaClient
const prisma = new PrismaClient({ adapter });

export default prisma;
```

*Note: Ensure that your Next.js application only instantiates a single `PrismaClient` in development to avoid connection limits.*
