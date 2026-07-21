import { config } from "dotenv";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { SEED_PARKS } from "./seed-data";

config({ path: ".env.local" });
config();

const connectionString =
  process.env.DATABASE_URL_UNPOOLED ??
  process.env.POSTGRES_URL_NON_POOLING ??
  process.env.DATABASE_URL ??
  process.env.POSTGRES_URL;

if (!connectionString) {
  throw new Error("No DATABASE_URL found in .env.local");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log(`Seeding ${SEED_PARKS.length} parks into Neon...`);

  for (const park of SEED_PARKS) {
    const { id, ...rest } = park as typeof park & { id: string };

    await prisma.park.upsert({
      where: { slug: rest.slug },
      create: {
        id,
        ...rest,
        plans: JSON.parse(JSON.stringify(rest.plans)),
        maintenanceCosts: JSON.parse(JSON.stringify(rest.maintenanceCosts)),
      },
      update: {
        name: rest.name,
        type: rest.type,
        status: rest.status,
        region: rest.region,
        commune: rest.commune,
        address: rest.address,
        lat: rest.lat,
        lng: rest.lng,
        description: rest.description,
        logoUrl: rest.logoUrl,
        imageUrl: rest.imageUrl,
        mainImage: rest.mainImage,
        gallery: rest.gallery,
        videoUrl: rest.videoUrl,
        features: rest.features,
        plans: JSON.parse(JSON.stringify(rest.plans)),
        maintenanceCosts: JSON.parse(JSON.stringify(rest.maintenanceCosts)),
        accessNotes: rest.accessNotes,
        transitNotes: rest.transitNotes,
        rating: rest.rating,
        minPrice: rest.minPrice,
        assignedExecutiveIds: rest.assignedExecutiveIds ?? [],
        partnerSellerIds: rest.partnerSellerIds ?? [],
      },
    });

    console.log(`  ✓ ${rest.name}`);
  }

  const count = await prisma.park.count();
  console.log(`Done. Total parks in DB: ${count}`);
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
