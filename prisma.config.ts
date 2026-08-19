import "dotenv/config";
import { defineConfig } from "prisma/config";

const shadowDatabaseUrl = process.env.SHADOW_DATABASE_URL;

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "bun run prisma/seed.ts",
  },
  datasource: {
    url: process.env.DATABASE_URL,
    ...(shadowDatabaseUrl?.startsWith("postgresql://") || shadowDatabaseUrl?.startsWith("postgres://")
      ? { shadowDatabaseUrl }
      : {}),
  },
});
