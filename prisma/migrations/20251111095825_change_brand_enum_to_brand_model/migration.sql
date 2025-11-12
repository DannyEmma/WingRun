/*
  Warnings:

  - You are about to drop the column `brand` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Product" DROP COLUMN "brand",
ADD COLUMN     "brandId" INTEGER;

-- DropEnum
DROP TYPE "public"."Brand";

-- CreateTable
CREATE TABLE "public"."Brand" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Brand_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Product" ADD CONSTRAINT "Product_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "public"."Brand"("id") ON DELETE SET NULL ON UPDATE CASCADE;
