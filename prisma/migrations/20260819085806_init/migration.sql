-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PageContent" (
    "id" TEXT NOT NULL,
    "pageSlug" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "titleAr" TEXT NOT NULL,
    "contentEn" TEXT NOT NULL,
    "contentAr" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PageContent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "titleAr" TEXT NOT NULL,
    "descriptionEn" TEXT,
    "descriptionAr" TEXT,
    "client" TEXT,
    "year" TEXT,
    "youtubeUrl" TEXT,
    "youtubeVideoId" TEXT,
    "posterUrl" TEXT,
    "posterAltEn" TEXT,
    "posterAltAr" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SiteSettings" (
    "id" TEXT NOT NULL DEFAULT 'global',
    "email" TEXT,
    "phone" TEXT,
    "whatsapp" TEXT,
    "instagram" TEXT,
    "youtube" TEXT,
    "vimeo" TEXT,
    "locationEn" TEXT,
    "locationAr" TEXT,
    "defaultSeoTitleEn" TEXT,
    "defaultSeoTitleAr" TEXT,
    "defaultSeoDescEn" TEXT,
    "defaultSeoDescAr" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteSettings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "PageContent_pageSlug_key" ON "PageContent"("pageSlug");

-- CreateIndex
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");
