/*
  Warnings:

  - A unique constraint covering the columns `[itemId,size]` on the table `Variant` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Variant_itemId_size_key" ON "Variant"("itemId", "size");
