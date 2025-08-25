/*
  Warnings:

  - The values [TOM] on the enum `DestinationGroup` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."DestinationGroup_new" AS ENUM ('METROPOLE', 'DOM');
ALTER TABLE "public"."destination" ALTER COLUMN "group" TYPE "public"."DestinationGroup_new" USING ("group"::text::"public"."DestinationGroup_new");
ALTER TYPE "public"."DestinationGroup" RENAME TO "DestinationGroup_old";
ALTER TYPE "public"."DestinationGroup_new" RENAME TO "DestinationGroup";
DROP TYPE "public"."DestinationGroup_old";
COMMIT;
