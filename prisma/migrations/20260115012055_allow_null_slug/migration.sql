-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "slug" TEXT;

-- AlterTable
ALTER TABLE "Item" ALTER COLUMN "productDetails" SET DEFAULT '[]';
