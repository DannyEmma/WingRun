/*
  Warnings:

  - Added the required column `stock` to the `ProductSize` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."ProductSize" ADD COLUMN     "stock" INTEGER NOT NULL;
