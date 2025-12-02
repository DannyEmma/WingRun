/*
  Warnings:

  - You are about to drop the column `productName` on the `OrderItem` table. All the data in the column will be lost.
  - Changed the type of `productId` on the `OrderItem` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "public"."OrderItem" DROP COLUMN "productName",
DROP COLUMN "productId",
ADD COLUMN     "productId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."OrderItem" ADD CONSTRAINT "OrderItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
