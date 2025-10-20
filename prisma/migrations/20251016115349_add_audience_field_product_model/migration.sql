-- CreateEnum
CREATE TYPE "public"."Audience" AS ENUM ('MEN', 'WOMEN', 'KIDS');

-- AlterTable
ALTER TABLE "public"."Product" ADD COLUMN     "audience" "public"."Audience";
