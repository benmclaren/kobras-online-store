/*
  Warnings:

  - You are about to drop the column `paymentIntendId` on the `Order` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[paymentIntentId]` on the table `Order` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Order_paymentIntendId_key";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "paymentIntendId",
ADD COLUMN     "paymentIntentId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Order_paymentIntentId_key" ON "Order"("paymentIntentId");
