import { defineConfig } from 'prisma/config';
import 'dotenv/config'; // This loads your .env file

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: process.env.DATABASE_URL as string
  }
});