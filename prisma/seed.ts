import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

async function main() {
  const email = process.env.ADMIN_EMAIL || 'admin@aliismail.com';
  const password = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'password123', 10);

  await prisma.user.upsert({
    where: { email },
    update: {},
    create: { email, name: 'Ali Ismail', password },
  });

  await prisma.siteSettings.upsert({
    where: { id: 'global' },
    update: {
      email: 'hello@aliismail.com',
      defaultSeoTitleEn: 'Ali Ismail | Cinematic Post-Production Editor',
      defaultSeoTitleAr: 'علي إسماعيل | محرر ما بعد الإنتاج السينمائي',
      defaultSeoDescEn: 'Cinematic editing, colour grading, and finishing by Ali Ismail.',
      defaultSeoDescAr: 'مونتاج سينمائي، تصحيح ألوان، ومعالجة نهائية من علي إسماعيل.',
    },
    create: {
      id: 'global',
      email: 'hello@aliismail.com',
      defaultSeoTitleEn: 'Ali Ismail | Cinematic Post-Production Editor',
      defaultSeoTitleAr: 'علي إسماعيل | محرر ما بعد الإنتاج السينمائي',
      defaultSeoDescEn: 'Cinematic editing, colour grading, and finishing by Ali Ismail.',
      defaultSeoDescAr: 'مونتاج سينمائي، تصحيح ألوان، ومعالجة نهائية من علي إسماعيل.',
    },
  });

  const pages = [
    {
      pageSlug: 'home',
      titleEn: 'Ali Ismail | Cinematic Post-Production Editor',
      titleAr: 'علي إسماعيل | محرر ما بعد الإنتاج السينمائي',
      contentEn: JSON.stringify({
        heroEyebrow: 'Cinematic Post-Production Editor',
        heroHeadline: 'ALI\nISMAIL',
        heroIntro: 'Editing images into stories that stay with you.',
        heroCta: 'View Selected Work',
        featuredHeading: 'Selected Work',
        featuredCopy: 'A selection of cinematic edits, colour, and finishing work.',
      }),
      contentAr: JSON.stringify({
        heroEyebrow: 'محرر ما بعد الإنتاج السينمائي',
        heroHeadline: 'علي\nإسماعيل',
        heroIntro: 'أحوّل اللقطات إلى قصص تبقى في الذاكرة.',
        heroCta: 'شاهد الأعمال المختارة',
        featuredHeading: 'أعمال مختارة',
        featuredCopy: 'مجموعة من أعمال المونتاج السينمائي وتصحيح الألوان والمعالجة النهائية.',
      }),
    },
    {
      pageSlug: 'about',
      titleEn: 'About Ali Ismail',
      titleAr: 'عن علي إسماعيل',
      contentEn: JSON.stringify({
        eyebrow: 'About Ali',
        heading: 'Cinematic Editing\nWith Intent',
        biography: 'Ali Ismail is a cinematic post-production editor focused on rhythm, emotion, and clarity. He shapes raw footage into films, commercials, and digital stories that feel considered from the first frame to the last.',
        secondaryStatement: 'Every project is approached with a filmmaker’s eye: finding the right pace, building the right atmosphere, and delivering a finish that serves the story.',
      }),
      contentAr: JSON.stringify({
        eyebrow: 'عن علي',
        heading: 'مونتاج سينمائي\nبهدف واضح',
        biography: 'علي إسماعيل محرر ما بعد إنتاج سينمائي يركّز على الإيقاع والعاطفة والوضوح. يحوّل اللقطات الخام إلى أفلام وإعلانات وقصص رقمية مدروسة من أول كادر إلى آخره.',
        secondaryStatement: 'يُبنى كل مشروع بعين صانع أفلام: إيجاد الإيقاع المناسب، وصناعة الأجواء، وتقديم معالجة نهائية تخدم القصة.',
      }),
    },
    {
      pageSlug: 'services',
      titleEn: 'Services',
      titleAr: 'الخدمات',
      contentEn: JSON.stringify({
        heading: 'Post-Production\nThat Moves',
        introduction: 'A focused post-production process for films, commercials, and digital campaigns—from the first assembly to final delivery.',
      }),
      contentAr: JSON.stringify({
        heading: 'ما بعد إنتاج\nيصنع الأثر',
        introduction: 'عملية ما بعد إنتاج مركّزة للأفلام والإعلانات والحملات الرقمية، من التجميع الأول حتى التسليم النهائي.',
      }),
    },
    {
      pageSlug: 'contact',
      titleEn: 'Start a Conversation',
      titleAr: 'لنبدأ الحديث',
      contentEn: JSON.stringify({
        heading: 'Let’s Make\nSomething Memorable',
        introduction: 'Have a film, campaign, or story in progress? Tell Ali about it and let’s find the right post-production approach.',
        ctaCopy: 'Tell Me About Your Project',
      }),
      contentAr: JSON.stringify({
        heading: 'لنصنع شيئاً\nلا يُنسى',
        introduction: 'لديك فيلم أو حملة أو قصة قيد التنفيذ؟ أخبر علي عنها لنجد معاً أسلوب ما بعد الإنتاج المناسب.',
        ctaCopy: 'أخبرني عن مشروعك',
      }),
    },
  ];

  for (const page of pages) {
    await prisma.pageContent.upsert({
      where: { pageSlug: page.pageSlug },
      update: page,
      create: page,
    });
  }

  await prisma.service.deleteMany();
  await prisma.service.createMany({
    data: [
      { titleEn: 'Cinematic Editing', titleAr: 'المونتاج السينمائي', descriptionEn: 'Story-led editing that finds the rhythm, emotion, and structure in every frame.', descriptionAr: 'مونتاج يقوده السرد لاكتشاف الإيقاع والعاطفة والبنية في كل لقطة.', sortOrder: 1 },
      { titleEn: 'Colour Grading', titleAr: 'تصحيح الألوان', descriptionEn: 'Purposeful colour work that creates atmosphere and gives each project a distinct visual language.', descriptionAr: 'معالجة لونية مدروسة تصنع الأجواء وتمنح كل مشروع لغة بصرية خاصة.', sortOrder: 2 },
      { titleEn: 'Motion & Finishing', titleAr: 'الموشن والمعالجة النهائية', descriptionEn: 'Refined motion graphics, visual polish, and delivery-ready finishing for every format.', descriptionAr: 'موشن جرافيك متقن ولمسات بصرية ومعالجة نهائية جاهزة للتسليم بكل الصيغ.', sortOrder: 3 },
    ],
  });

  console.log('Ali Ismail portfolio seed completed.');
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
