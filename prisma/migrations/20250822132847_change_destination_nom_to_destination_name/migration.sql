/*
  Warnings:

  - You are about to drop the column `nom` on the `destination` table. All the data in the column will be lost.
  - Added the required column `name` to the `destination` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."destination" DROP COLUMN "nom",
ADD COLUMN     "name" TEXT NOT NULL;
