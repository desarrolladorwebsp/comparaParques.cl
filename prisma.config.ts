import { config } from "dotenv";
import { defineConfig } from "prisma/config";

// Next.js / Vercel: credenciales viven en .env.local
config({ path: ".env.local" });
config();

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "npx tsx prisma/seed.ts",
  },
  datasource: {
    // Migraciones: preferir URL sin pooler (Neon unpooled)
    url:
      process.env.DATABASE_URL_UNPOOLED ??
      process.env.POSTGRES_URL_NON_POOLING ??
      process.env.DATABASE_URL ??
      process.env.POSTGRES_URL,
  },
});
