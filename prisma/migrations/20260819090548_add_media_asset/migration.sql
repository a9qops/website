-- CreateTable
CREATE TABLE "MediaAsset" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "mimeType" TEXT,
    "width" INTEGER,
    "height" INTEGER,
    "altEn" TEXT,
    "altAr" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MediaAsset_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MediaAsset_key_key" ON "MediaAsset"("key");
