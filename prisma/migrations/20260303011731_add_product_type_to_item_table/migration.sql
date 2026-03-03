-- CreateEnum
CREATE TYPE "ProductType" AS ENUM ('SIMPLE', 'VARIANT');

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "stock" INTEGER,
ADD COLUMN     "type" "ProductType" NOT NULL DEFAULT 'SIMPLE';
