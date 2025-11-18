-- CreateEnum
CREATE TYPE "public"."ProductTag" AS ENUM ('BEST_SELLER', 'OUR_PICK', 'NEW_ARRIVAL', 'POPULAR');

-- AlterTable
ALTER TABLE "public"."Product" ADD COLUMN     "tags" "public"."ProductTag"[];
