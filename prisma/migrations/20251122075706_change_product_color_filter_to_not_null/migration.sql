/*
  Warnings:

  - Made the column `colorFilterId` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."Product" DROP CONSTRAINT "Product_colorFilterId_fkey";

-- AlterTable
ALTER TABLE "public"."Product" ALTER COLUMN "colorFilterId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Product" ADD CONSTRAINT "Product_colorFilterId_fkey" FOREIGN KEY ("colorFilterId") REFERENCES "public"."ColorFilter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
