import { PrismaClient } from '../generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

// Create a native node-postgres connection pool
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

// Pass it to the Prisma adapter
const adapter = new PrismaPg(pool);

// Initialize Prisma Client with the adapter
const prisma = new PrismaClient({ adapter });

export default prisma;