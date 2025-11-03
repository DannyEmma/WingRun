-- CreateTable
CREATE TABLE "public"."Size" (
    "id" SERIAL NOT NULL,
    "size" TEXT NOT NULL,
    "audience" "public"."Audience" NOT NULL,

    CONSTRAINT "Size_pkey" PRIMARY KEY ("id")
);
