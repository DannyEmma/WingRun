/*
  Warnings:

  - A unique constraint covering the columns `[destinationId]` on the table `address` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "address_destinationId_key" ON "public"."address"("destinationId");
