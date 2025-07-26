/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Property` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Property_title_key" ON "Property"("title");
