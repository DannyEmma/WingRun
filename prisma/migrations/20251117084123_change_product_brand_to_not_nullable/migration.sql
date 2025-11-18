/*
  Warnings:

  - Made the column `brandId` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."Product" DROP CONSTRAINT "Product_brandId_fkey";

-- AlterTable
ALTER TABLE "public"."Product" ALTER COLUMN "brandId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Product" ADD CONSTRAINT "Product_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "public"."Brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
