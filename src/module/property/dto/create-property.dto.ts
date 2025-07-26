import {
  IsString,
  IsOptional,
  IsInt,
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsDateString,
} from 'class-validator';


enum PropertyStatus {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  SOLD = 'SOLD',
}

enum PropertySource {
  MANUAL = 'MANUAL',
  SCRAPED = 'SCRAPED',
}

export class CreatePropertyDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  propertyNote?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(PropertyStatus)
  status?: PropertyStatus;

  @IsArray()
  @IsString({ each: true })
  images: string[];

  // Size & Layout
  @IsOptional() @IsInt() squareFeet?: number;
  @IsOptional() @IsInt() interiorTotalSqFt?: number;
  @IsOptional() @IsInt() interiorlivableSqFt?: number;
  @IsOptional() @IsInt() interiorFinishedSqFt?: number;
  @IsOptional() @IsInt() lotSizeSqFt?: number;
  @IsOptional() @IsInt() bedrooms?: number;
  @IsOptional() @IsInt() bathrooms?: number;
  @IsOptional() @IsInt() stories?: number;
  @IsOptional() @IsBoolean() basement?: boolean;
  @IsArray() @IsString({ each: true }) roomTypes: string[];
  @IsOptional() @IsInt() totalParkingSpaces?: number;
  @IsOptional() @IsInt() attachedGarageSpaces?: number;

  // Location
  @IsString() address: string;
  @IsString() city: string;
  @IsString() region: string;
  @IsString() zipCode: string;
  @IsOptional() @IsNumber() latitude?: number;
  @IsOptional() @IsNumber() longitude?: number;

  // Auction Info
  @IsBoolean() isAuction: boolean;
  @IsOptional() @IsDateString() auctionStartDate?: string;
  @IsOptional() @IsDateString() auctionEndDate?: string;
  @IsOptional() @IsInt() auctionCountdown?: number;
  @IsOptional() @IsInt() dom?: number;

  // Pricing
  @IsOptional() @IsInt() price?: number;
  @IsOptional() @IsInt() arv?: number;
  @IsOptional() @IsInt() rehabEstimate?: number;
  @IsOptional() @IsInt() resale90Day?: number;
  @IsOptional() @IsInt() pricePerSqFt?: number;
  @IsOptional() @IsInt() taxAssessedValue?: number;
  @IsOptional() @IsInt() annualTaxAmount?: number;
  @IsOptional() @IsArray() @IsString({ each: true }) listingTerms?: string[];

  // Construction
  @IsOptional() @IsInt() yearBuilt?: number;
  @IsOptional() @IsBoolean() isNewConstruction?: boolean;
  @IsOptional() @IsBoolean() hasFireplace?: boolean;
  @IsOptional() @IsString() type?: string;
  @IsOptional() @IsString() subtype?: string;
  @IsOptional() @IsString() roofType?: string;
  @IsOptional() @IsString() material?: string;
  @IsOptional() @IsString() heating?: string;
  @IsOptional() @IsString() cooling?: string;

  // Features
  @IsOptional() @IsArray() @IsString({ each: true }) appliances?: string[];
  @IsOptional() @IsArray() @IsString({ each: true }) features?: string[];
  @IsOptional() @IsArray() @IsString({ each: true }) diningRoomFeatures?: string[];
  @IsOptional() @IsArray() @IsString({ each: true }) familyRoomFeature?: string[];
  @IsOptional() @IsArray() @IsString({ each: true }) kitchenRoomFeature?: string[];
  @IsOptional() @IsArray() @IsString({ each: true }) parkingFeatures?: string[];
  @IsOptional() @IsArray() @IsString({ each: true }) fireplaceFeatures?: string[];

  // Levels
  @IsOptional() @IsString() diningLevel?: string;
  @IsOptional() @IsString() familyRoomLevel?: string;
  @IsOptional() @IsString() kitchenLevel?: string;
  @IsOptional() @IsString() livingRoomLevel?: string;

  // Utilities
  @IsOptional() @IsString() sewer?: string;
  @IsOptional() @IsString() water?: string;
  @IsOptional() @IsBoolean() propaneRental?: boolean;
  @IsOptional() @IsBoolean() electricUtility?: boolean;

  // Metadata
  @IsOptional() @IsEnum(PropertySource) propertySource?: PropertySource;
  @IsOptional() @IsString() parcelNumber?: string;
  @IsOptional() @IsString() createdById?: string;
}
