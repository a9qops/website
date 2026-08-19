import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const email = process.env.ADMIN_EMAIL || 'admin@nine.com';
  const passwordStr = process.env.ADMIN_PASSWORD || 'password123';
  
  const hashedPassword = await bcrypt.hash(passwordStr, 10);

  const user = await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      name: 'Nine Admin',
      password: hashedPassword,
    },
  });

  console.log({ user });
  
  // Seed initial site settings
  await prisma.siteSettings.upsert({
    where: { id: 'global' },
    update: {},
    create: {
      id: 'global',
      email: 'hello@nine.com',
      defaultSeoTitleEn: 'Nine Portfolio',
      defaultSeoTitleAr: 'محفظة ناين',
    }
  });

  // Clear existing projects to avoid duplicates on re-seed (optional, but good for a fresh start)
  await prisma.project.deleteMany({});

  // Seed Projects
  const imageUrl = "https://github.com/Ameriq8/curisjs/blob/main/assets/CurisJS.png?raw=true";
  
  await prisma.project.createMany({
    data: [
      {
        slug: "curisjs-brand-film",
        titleEn: "CurisJS Brand Film",
        titleAr: "فيلم العلامة التجارية كيوريس جي إس",
        descriptionEn: "A dynamic and high-energy brand film showcasing the future of JavaScript tooling.",
        descriptionAr: "فيلم ديناميكي وعالي الطاقة يعرض مستقبل أدوات جافا سكريبت.",
        posterUrl: imageUrl,
        posterAltEn: "CurisJS Thumbnail",
        posterAltAr: "صورة مصغرة كيوريس جي إس",
        youtubeVideoId: "aqz-KE-bpKQ", // Placeholder Big Buck Bunny or similar
        client: "Open Source Community",
        year: "2026",
        published: true,
        featured: true,
        sortOrder: 1,
      },
      {
        slug: "neon-nights-commercial",
        titleEn: "Neon Nights Commercial",
        titleAr: "إعلان ليالي النيون",
        descriptionEn: "A cinematic sequence featuring stunning color grading and advanced VFX compositing.",
        descriptionAr: "تسلسل سينمائي يتميز بتصحيح ألوان مذهل وتركيب مؤثرات بصرية متقدمة.",
        posterUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1080&auto=format&fit=crop",
        posterAltEn: "Neon Cyberpunk Cityscape",
        posterAltAr: "منظر مدينة سايبربانك نيون",
        youtubeVideoId: "LXb3EKWsInQ", 
        client: "Future Tech",
        year: "2025",
        published: true,
        featured: true,
        sortOrder: 2,
      },
      {
        slug: "desert-mirage-doc",
        titleEn: "Desert Mirage Documentary",
        titleAr: "وثائقي سراب الصحراء",
        descriptionEn: "Award-winning short documentary exploring the shifting sands of the Empty Quarter.",
        descriptionAr: "فيلم وثائقي قصير حائز على جوائز يستكشف الرمال المتحركة في الربع الخالي.",
        posterUrl: "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?q=80&w=1080&auto=format&fit=crop",
        posterAltEn: "Desert Dunes",
        posterAltAr: "كثبان رملية صحراوية",
        youtubeVideoId: "EngW7tLk6R8",
        client: "National Geo",
        year: "2024",
        published: true,
        featured: false,
        sortOrder: 3,
      }
    ]
  });
  
  console.log('Seed completed successfully. Added 3 projects.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
