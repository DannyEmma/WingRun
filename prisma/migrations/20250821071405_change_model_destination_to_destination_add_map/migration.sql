/*
  Warnings:

  - You are about to drop the `Destination` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."Destination";

-- CreateTable
CREATE TABLE "public"."destination" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "group" "public"."DestinationGroup" NOT NULL,
    "actif" BOOLEAN NOT NULL,
    "code_iso" TEXT NOT NULL,

    CONSTRAINT "destination_pkey" PRIMARY KEY ("id")
);
