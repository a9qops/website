/* eslint-disable @typescript-eslint/no-unused-vars */
import { prisma } from '../src/lib/prisma';
import bcrypt from 'bcryptjs';
import { encrypt, decrypt } from '../src/lib/auth';

async function runTests() {
  console.log("--- PHASE 03 TEST SUITE ---");
  
  // 1. PAGE CONTENT PERSISTENCE
  console.log("\n[1] PageContent Persistence");
  await prisma.pageContent.deleteMany();
  const page = await prisma.pageContent.create({
    data: {
      pageSlug: "home",
      titleEn: "Home",
      titleAr: "الرئيسية",
      contentEn: "Content A",
      contentAr: "Content B"
    }
  });
  console.log("Created PageContent:", !!page.id);
  const fetchedPage = await prisma.pageContent.findUnique({ where: { pageSlug: 'home' } });
  console.log("EN Content independent:", fetchedPage?.contentEn === "Content A");
  console.log("AR Content independent:", fetchedPage?.contentAr === "Content B");

  // 2. SITESETTINGS PERSISTENCE
  console.log("\n[2] SiteSettings Persistence");
  await prisma.siteSettings.deleteMany();
  const settings = await prisma.siteSettings.create({
    data: {
      id: "global",
      // Optional fields omitted to prove they can be null
      defaultSeoTitleEn: "Test",
      defaultSeoTitleAr: "Test AR"
    }
  });
  console.log("SiteSettings created without optional fields:", settings.phone === null);

  // 3. PROJECT MODEL VALIDATION
  console.log("\n[3] Project Model Validation");
  await prisma.project.deleteMany();
  const p1 = await prisma.project.create({
    data: {
      slug: "test-slug-1",
      titleEn: "Project 1",
      titleAr: "مشروع 1",
      published: true
    }
  });
  
  try {
    await prisma.project.create({
      data: {
        slug: "test-slug-1", // Duplicate slug
        titleEn: "Project 2",
        titleAr: "مشروع 2",
        published: true
      }
    });
    console.error("FAIL: Slug uniqueness not enforced!");
  } catch {
    console.log("Slug uniqueness enforced:", true);
  }

  // 4. DRAFT/PUBLISH SAFETY
  console.log("\n[4] Draft/Publish Safety");
  await prisma.project.create({
    data: {
      slug: "draft-slug",
      titleEn: "Draft",
      titleAr: "مسودة",
      published: false
    }
  });
  const publicProjects = await prisma.project.findMany({ where: { published: true } });
  const draftExcluded = publicProjects.every(p => p.slug !== 'draft-slug');
  console.log("Draft projects excluded from public queries:", draftExcluded);

  // 5. JWT TOKENS
  console.log("\n[5] JWT / Session Validation");
  const token = await encrypt({ userId: "test-user-id" });
  const payload = await decrypt(token);
  console.log("Token encrypt/decrypt:", payload.userId === "test-user-id");
  
  const invalidPayload = await decrypt("invalid.token.string");
  console.log("Invalid token rejection:", invalidPayload === null);

  // 6. PASSWORD HASHING
  console.log("\n[6] Password Validation");
  const testPw = "securepassword";
  const hash = await bcrypt.hash(testPw, 10);
  const match1 = await bcrypt.compare(testPw, hash);
  const match2 = await bcrypt.compare("wrong", hash);
  console.log("Valid password match:", match1);
  console.log("Invalid password rejection:", !match2);

  console.log("\n--- TESTS COMPLETE ---");
  await prisma.$disconnect();
}

runTests().catch(e => {
  console.error(e);
  process.exit(1);
});
