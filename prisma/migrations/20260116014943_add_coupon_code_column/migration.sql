/*
  Warnings:

  - Made the column `couponCode` on table `PromoCode` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "PromoCode" ALTER COLUMN "couponCode" SET NOT NULL;
