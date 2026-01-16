/*
  Warnings:

  - You are about to drop the column `cuponCode` on the `PromoCode` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[couponCode]` on the table `PromoCode` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "PromoCode_cuponCode_key";

-- AlterTable
ALTER TABLE "PromoCode" DROP COLUMN "cuponCode",
ADD COLUMN     "couponCode" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "PromoCode_couponCode_key" ON "PromoCode"("couponCode");
