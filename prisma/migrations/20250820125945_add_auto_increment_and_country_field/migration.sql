/*
  Warnings:

  - The primary key for the `Destination` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Destination` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `address` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `address` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `country` to the `address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Destination" DROP CONSTRAINT "Destination_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Destination_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "public"."address" DROP CONSTRAINT "address_pkey",
ADD COLUMN     "country" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "cp" SET DATA TYPE TEXT,
ADD CONSTRAINT "address_pkey" PRIMARY KEY ("id");
