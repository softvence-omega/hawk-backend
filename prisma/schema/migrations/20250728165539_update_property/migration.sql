/*
  Warnings:

  - Made the column `createdById` on table `Property` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Property" DROP CONSTRAINT "Property_createdById_fkey";

-- AlterTable
ALTER TABLE "Property" ALTER COLUMN "createdById" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
