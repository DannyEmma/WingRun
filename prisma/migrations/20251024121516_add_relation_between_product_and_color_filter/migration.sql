-- AlterTable
ALTER TABLE "public"."Product" ADD COLUMN     "colorFilterId" INTEGER;

-- AddForeignKey
ALTER TABLE "public"."Product" ADD CONSTRAINT "Product_colorFilterId_fkey" FOREIGN KEY ("colorFilterId") REFERENCES "public"."ColorFilter"("id") ON DELETE SET NULL ON UPDATE CASCADE;
