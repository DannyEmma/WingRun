-- CreateTable
CREATE TABLE "public"."Products" (
    "id" SERIAL NOT NULL,
    "brand" TEXT NOT NULL,
    "line" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "variant" TEXT,
    "colorway" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "visuals" TEXT[],

    CONSTRAINT "Products_pkey" PRIMARY KEY ("id")
);
