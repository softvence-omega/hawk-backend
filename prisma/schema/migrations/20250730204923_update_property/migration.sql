-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "PropertyStatus" ADD VALUE 'POSTPONED';
ALTER TYPE "PropertyStatus" ADD VALUE 'CANCELED';

-- AlterTable
ALTER TABLE "Property" ADD COLUMN     "enrichedFromZillow" BOOLEAN DEFAULT false,
ADD COLUMN     "zillowStatus" TEXT,
ADD COLUMN     "zillowUrl" TEXT,
ADD COLUMN     "zillowZestimate" INTEGER;
