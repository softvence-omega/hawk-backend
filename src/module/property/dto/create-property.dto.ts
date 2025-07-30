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
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum PropertyStatus {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  SOLD = 'SOLD',
  POSTPONED ='POSTPONED',
  CANCELED='CANCELED'
}

export enum PropertySource {
  MANUAL = 'MANUAL',
  SCRAPED = 'SCRAPED',
}

export class CreatePropertyDto {
  @ApiProperty({ example: 'Spacious 4BR Family Home' })
  @IsString()
  title: string;

  @ApiPropertyOptional({ example: 'This property is great for investment.' })
  @IsOptional()
  @IsString()
  propertyNote?: string;

  @ApiPropertyOptional({ example: 'A beautiful 4-bedroom house...' })
  @IsOptional()
  @IsString()
  description?: string;


  // Size & Layout
  @ApiPropertyOptional({ example: 2500 })
  @IsOptional() @IsInt() squareFeet?: number;

  @ApiPropertyOptional({ example: 2400 })
  @IsOptional() @IsInt() interiorTotalSqFt?: number;

  @ApiPropertyOptional({ example: 2300 })
  @IsOptional() @IsInt() interiorlivableSqFt?: number;

  @ApiPropertyOptional({ example: 2000 })
  @IsOptional() @IsInt() interiorFinishedSqFt?: number;

  @ApiPropertyOptional({ example: 6000 })
  @IsOptional() @IsInt() lotSizeSqFt?: number;

  @ApiPropertyOptional({ example: 4 })
  @IsOptional() @IsInt() bedrooms?: number;

  @ApiPropertyOptional({ example: 3 })
  @IsOptional() @IsInt() bathrooms?: number;

  @ApiPropertyOptional({ example: 2 })
  @IsOptional() @IsInt() stories?: number;

  @ApiPropertyOptional({ example: true })
  @IsOptional() @IsBoolean() basement?: boolean;

  @ApiProperty({ type: [String], example: ['Living Room', 'Dining Room'] })
  @IsOptional() @IsArray() @IsString({ each: true }) roomTypes: string[];

  @ApiPropertyOptional({ example: 4 })
  @IsOptional() @IsInt() totalParkingSpaces?: number;

  @ApiPropertyOptional({ example: 2 })
  @IsOptional() @IsInt() attachedGarageSpaces?: number;

  // Location
  @ApiProperty({ example: '123 Main St' })
  @IsString() address: string;

  @ApiProperty({ example: 'Los Angeles' })
  @IsString() city: string;

  @ApiProperty({ example: 'CA' })
  @IsString() region: string;

  @ApiProperty({ example: '90001' })
  @IsString() zipCode: string;

  @ApiPropertyOptional({ example: 34.0522 })
  @IsOptional() @IsNumber() latitude?: number;

  @ApiPropertyOptional({ example: -118.2437 })
  @IsOptional() @IsNumber() longitude?: number;

  // Auction Info
  @ApiProperty({ example: true })
  @IsBoolean() isAuction: boolean;

  @ApiPropertyOptional({ example: '2025-08-01T10:00:00Z' })
  @IsOptional() @IsDateString() auctionStartDate?: string;

  @ApiPropertyOptional({ example: '2025-08-10T18:00:00Z' })
  @IsOptional() @IsDateString() auctionEndDate?: string;

  // Pricing
  @ApiPropertyOptional({ example: 450000 })
  @IsOptional() @IsInt() price?: number;

  @ApiPropertyOptional({ example: 520000 })
  @IsOptional() @IsInt() arv?: number;

  @ApiPropertyOptional({ example: 25000 })
  @IsOptional() @IsInt() rehabEstimate?: number;

  @ApiPropertyOptional({ example: 480000 })
  @IsOptional() @IsInt() resale90Day?: number;

  @ApiPropertyOptional({ example: 180 })
  @IsOptional() @IsInt() pricePerSqFt?: number;

  @ApiPropertyOptional({ example: 400000 })
  @IsOptional() @IsInt() taxAssessedValue?: number;

  @ApiPropertyOptional({ example: 3200 })
  @IsOptional() @IsInt() annualTaxAmount?: number;

  @ApiPropertyOptional({ type: [String], example: ['Cash', 'Conventional'] })
  @IsOptional() @IsArray() @IsString({ each: true }) listingTerms?: string[];

  // Construction
  @ApiPropertyOptional({ example: 2010 })
  @IsOptional() @IsInt() yearBuilt?: number;

  @ApiPropertyOptional({ example: false })
  @IsOptional() @IsBoolean() isNewConstruction?: boolean;

  @ApiPropertyOptional({ example: true })
  @IsOptional() @IsBoolean() hasFireplace?: boolean;

  @ApiPropertyOptional({ example: 'Single Family' })
  @IsOptional() @IsString() type?: string;

  @ApiPropertyOptional({ example: 'Single Family Residence' })
  @IsOptional() @IsString() subtype?: string;

  @ApiPropertyOptional({ example: 'Tile' })
  @IsOptional() @IsString() roofType?: string;

  @ApiPropertyOptional({ example: 'Frame' })
  @IsOptional() @IsString() material?: string;

  @ApiPropertyOptional({ example: 'Central' })
  @IsOptional() @IsString() heating?: string;

  @ApiPropertyOptional({ example: 'Central Air' })
  @IsOptional() @IsString() cooling?: string;

  // Features
  @ApiPropertyOptional({ type: [String], example: ['Dishwasher', 'Water Heater'] })
  @IsOptional() @IsArray() @IsString({ each: true }) appliances?: string[];

  @ApiPropertyOptional({ type: [String], example: ['Fireplace', 'Formal Dining'] })
  @IsOptional() @IsArray() @IsString({ each: true }) features?: string[];

  @ApiPropertyOptional({ type: [String], example: ['Formal', 'Open'] })
  @IsOptional() @IsArray() @IsString({ each: true }) diningRoomFeatures?: string[];

  @ApiPropertyOptional({ type: [String], example: ['Entertainment Center'] })
  @IsOptional() @IsArray() @IsString({ each: true }) familyRoomFeature?: string[];

  @ApiPropertyOptional({ type: [String], example: ['Granite Counters'] })
  @IsOptional() @IsArray() @IsString({ each: true }) kitchenRoomFeature?: string[];

  @ApiPropertyOptional({ type: [String], example: ['Garage', 'Driveway'] })
  @IsOptional() @IsArray() @IsString({ each: true }) parkingFeatures?: string[];

  @ApiPropertyOptional({ type: [String], example: ['Wood Burning'] })
  @IsOptional() @IsArray() @IsString({ each: true }) fireplaceFeatures?: string[];

  // Levels
  @ApiPropertyOptional({ example: 'Main' })
  @IsOptional() @IsString() diningLevel?: string;

  @ApiPropertyOptional({ example: 'Second Floor' })
  @IsOptional() @IsString() familyRoomLevel?: string;

  @ApiPropertyOptional({ example: 'Main Floor' })
  @IsOptional() @IsString() kitchenLevel?: string;

  @ApiPropertyOptional({ example: 'Main Floor' })
  @IsOptional() @IsString() livingRoomLevel?: string;

  // Utilities
  @ApiPropertyOptional({ example: 'Public' })
  @IsOptional() @IsString() sewer?: string;

  @ApiPropertyOptional({ example: 'City' })
  @IsOptional() @IsString() water?: string;

  @ApiPropertyOptional({ example: false })
  @IsOptional() @IsBoolean() propaneRental?: boolean;

  @ApiPropertyOptional({ example: true })
  @IsOptional() @IsBoolean() electricUtility?: boolean;

  // Metadata
  @ApiPropertyOptional({ enum: PropertySource, default: PropertySource.MANUAL })
  @IsOptional() @IsEnum(PropertySource) propertySource?: PropertySource;

  @ApiPropertyOptional({ example: '1234567890' })
  @IsOptional() @IsString() parcelNumber?: string;

  @ApiPropertyOptional({ example: 'user-uuid-here' })
  @IsOptional() @IsString() createdById?: string;
}


export class CreatePropertyDtoWithFiles extends CreatePropertyDto {
  @ApiProperty({
    type: 'array',
    items: {
      type: 'string',
      format: 'binary',
    },
    description: 'Upload up to 10 images',
    required: false,
  })
  files: any;
}