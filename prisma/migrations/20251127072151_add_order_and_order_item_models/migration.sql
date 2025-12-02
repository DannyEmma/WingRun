-- CreateEnum
CREATE TYPE "public"."OrderStatus" AS ENUM ('PENDING', 'CANCELLED', 'PAID');

-- CreateTable
CREATE TABLE "public"."Order" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "totalAmountCent" INTEGER NOT NULL,
    "status" "public"."OrderStatus" NOT NULL DEFAULT 'PENDING',
    "stripeSessionId" TEXT,
    "stripePaymentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."OrderItem" (
    "id" SERIAL NOT NULL,
    "productId" TEXT NOT NULL,
    "productName" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "orderId" INTEGER NOT NULL,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Order_stripeSessionId_key" ON "public"."Order"("stripeSessionId");

-- AddForeignKey
ALTER TABLE "public"."Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "public"."Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
