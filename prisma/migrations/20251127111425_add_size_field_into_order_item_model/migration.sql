/*
  Warnings:

  - Added the required column `sizeId` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."OrderItem" ADD COLUMN     "sizeId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."OrderItem" ADD CONSTRAINT "OrderItem_sizeId_fkey" FOREIGN KEY ("sizeId") REFERENCES "public"."Size"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
