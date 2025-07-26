-- CreateEnum
CREATE TYPE "PropertyStatus" AS ENUM ('PENDING', 'ACTIVE', 'APPROVED', 'REJECTED', 'SOLD');

-- CreateEnum
CREATE TYPE "PropertySource" AS ENUM ('MANUAL', 'SCRAPED');

-- CreateTable
CREATE TABLE "Property" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "propertyNote" TEXT,
    "description" TEXT,
    "status" "PropertyStatus" NOT NULL DEFAULT 'PENDING',
    "images" TEXT[],
    "squareFeet" INTEGER,
    "interiorTotalSqFt" INTEGER,
    "interiorlivableSqFt" INTEGER,
    "interiorFinishedSqFt" INTEGER,
    "lotSizeSqFt" INTEGER,
    "bedrooms" INTEGER,
    "bathrooms" INTEGER,
    "stories" INTEGER,
    "basement" BOOLEAN,
    "roomTypes" TEXT[],
    "totalParkingSpaces" INTEGER,
    "attachedGarageSpaces" INTEGER,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "isAuction" BOOLEAN NOT NULL DEFAULT false,
    "auctionStartDate" TIMESTAMP(3),
    "auctionEndDate" TIMESTAMP(3),
    "auctionCountdown" INTEGER,
    "dom" INTEGER,
    "price" INTEGER,
    "arv" INTEGER,
    "rehabEstimate" INTEGER,
    "resale90Day" INTEGER,
    "pricePerSqFt" INTEGER,
    "taxAssessedValue" INTEGER,
    "annualTaxAmount" INTEGER,
    "listingTerms" TEXT[],
    "yearBuilt" INTEGER,
    "isNewConstruction" BOOLEAN,
    "hasFireplace" BOOLEAN,
    "type" TEXT,
    "subtype" TEXT,
    "roofType" TEXT,
    "material" TEXT,
    "heating" TEXT,
    "cooling" TEXT,
    "appliances" TEXT[],
    "features" TEXT[],
    "diningRoomFeatures" TEXT[],
    "familyRoomFeature" TEXT[],
    "kitchenRoomFeature" TEXT[],
    "parkingFeatures" TEXT[],
    "fireplaceFeatures" TEXT[],
    "diningLevel" TEXT,
    "familyRoomLevel" TEXT,
    "kitchenLevel" TEXT,
    "livingRoomLevel" TEXT,
    "sewer" TEXT,
    "water" TEXT,
    "propaneRental" BOOLEAN,
    "electricUtility" BOOLEAN,
    "propertySource" "PropertySource" NOT NULL DEFAULT 'MANUAL',
    "parcelNumber" TEXT,
    "createdById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bid" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Bid_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comp" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Comp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BidToProperty" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_BidToProperty_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_CompToProperty" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_CompToProperty_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_BidToProperty_B_index" ON "_BidToProperty"("B");

-- CreateIndex
CREATE INDEX "_CompToProperty_B_index" ON "_CompToProperty"("B");

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BidToProperty" ADD CONSTRAINT "_BidToProperty_A_fkey" FOREIGN KEY ("A") REFERENCES "Bid"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BidToProperty" ADD CONSTRAINT "_BidToProperty_B_fkey" FOREIGN KEY ("B") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CompToProperty" ADD CONSTRAINT "_CompToProperty_A_fkey" FOREIGN KEY ("A") REFERENCES "Comp"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CompToProperty" ADD CONSTRAINT "_CompToProperty_B_fkey" FOREIGN KEY ("B") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;
