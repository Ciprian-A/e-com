-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "description" TEXT;

-- AlterTable
ALTER TABLE "Item" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "PromoCode" ALTER COLUMN "description" DROP NOT NULL;
