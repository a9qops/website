import { prisma } from '../src/lib/prisma';
import { extractYouTubeVideoId } from '../src/lib/youtube';

async function runTests() {
  console.log("--- PHASE 05 TEST SUITE ---");

  // 1. YouTube Parser
  console.log("\n[1] YouTube Parser Tests");
  const urls = [
    { url: 'https://youtube.com/watch?v=dQw4w9WgXcQ', expected: 'dQw4w9WgXcQ' },
    { url: 'https://youtu.be/dQw4w9WgXcQ', expected: 'dQw4w9WgXcQ' },
    { url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', expected: 'dQw4w9WgXcQ' },
    { url: 'https://youtube.com/shorts/dQw4w9WgXcQ', expected: 'dQw4w9WgXcQ' },
    { url: 'https://example.com/video', expected: null },
    { url: 'not-a-url', expected: null },
  ];
  
  let ytPassed = true;
  for (const { url, expected } of urls) {
    const res = extractYouTubeVideoId(url);
    if (res !== expected) {
      console.error(`FAIL: ${url} -> Expected ${expected}, got ${res}`);
      ytPassed = false;
    }
  }
  console.log(`YouTube parser: ${ytPassed ? 'PASSED' : 'FAILED'}`);

  // 2. Project Slug Duplicate test
  console.log("\n[2] Project Database Constraint Tests");
  try {
    await prisma.project.create({
      data: { titleEn: 'T1', titleAr: 'T1', slug: 'unique-slug' }
    });
    
    let caughtDuplicate = false;
    try {
      await prisma.project.create({
        data: { titleEn: 'T2', titleAr: 'T2', slug: 'unique-slug' }
      });
    } catch {
      caughtDuplicate = true;
    }
    console.log(`Duplicate slug rejected: ${caughtDuplicate}`);
    
    // Cleanup
    await prisma.project.delete({ where: { slug: 'unique-slug' } });
  } catch {
    console.log("Error in duplicate test");
  }

  // 3. Draft vs Published queries
  console.log("\n[3] Publishing Queries");
  await prisma.project.create({
    data: { titleEn: 'Draft', titleAr: 'D', slug: 'draft-1', published: false }
  });
  await prisma.project.create({
    data: { titleEn: 'Pub', titleAr: 'P', slug: 'pub-1', published: true }
  });

  const drafts = await prisma.project.findMany({ where: { published: true } });
  const hasDraft = drafts.some(p => p.slug === 'draft-1');
  const hasPub = drafts.some(p => p.slug === 'pub-1');
  
  console.log(`Draft excluded from 'published: true' query: ${!hasDraft}`);
  console.log(`Published included in 'published: true' query: ${hasPub}`);

  // Cleanup
  await prisma.project.deleteMany({ where: { slug: { in: ['draft-1', 'pub-1'] } } });

  console.log("\n--- TESTS COMPLETE ---");
  await prisma.$disconnect();
}

runTests().catch(e => {
  console.error(e);
  process.exit(1);
});
