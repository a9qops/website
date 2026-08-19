 
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const PRISMA_SCHEMA_VERSION = '2026-08-19-services-and-discord-webhook';
const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
  prismaSchemaVersion?: string;
};

// Use a shared connection pool, falling back to process.env.DATABASE_URL
const connectionString = process.env.DATABASE_URL;

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

// Regenerate the client after schema changes before relying on new delegates. In
// development, discard a singleton created by an older generated client.
const existingPrisma = globalForPrisma.prisma;
export const prisma = existingPrisma
  && globalForPrisma.prismaSchemaVersion === PRISMA_SCHEMA_VERSION
  ? existingPrisma
  : new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
  globalForPrisma.prismaSchemaVersion = PRISMA_SCHEMA_VERSION;
}

export default prisma;
