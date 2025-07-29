import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsInt,
  IsBoolean,
  IsArray,
  IsDateString,
  IsEnum,
  IsNumber,
} from 'class-validator';
import { CreatePropertyDtoWithFiles, PropertySource } from './create-property.dto';
import { PropertyStatus } from '@prisma/client';

export class UpdatePropertyDtoWithFiles extends PartialType(CreatePropertyDtoWithFiles) {
  @ApiPropertyOptional({ description: 'deleted image ids', type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  deletedImageIds?: string[];
  // @ApiPropertyOptional({ description: 'Property title' })
  // @IsOptional()
  // @IsString()
  // title?: string;

  // @ApiPropertyOptional({ description: 'Property note' })
  // @IsOptional()
  // @IsString()
  // propertyNote?: string;

  // @ApiPropertyOptional({ description: 'Property description' })
  // @IsOptional()
  // @IsString()
  // description?: string;

  // @ApiPropertyOptional({ enum: PropertyStatus, default: PropertyStatus.PENDING, description: 'Current status of the property' })
  // @IsOptional()
  // @IsEnum(PropertyStatus)
  // status?: PropertyStatus;

  // @ApiPropertyOptional({ description: 'Square footage of the property' })
  // @IsOptional()
  // @IsInt()
  // squareFeet?: number;

  // @ApiPropertyOptional({ description: 'Total interior square feet' })
  // @IsOptional()
  // @IsInt()
  // interiorTotalSqFt?: number;

  // @ApiPropertyOptional({ description: 'Interior livable square feet' })
  // @IsOptional()
  // @IsInt()
  // interiorlivableSqFt?: number;

  // @ApiPropertyOptional({ description: 'Interior finished square feet' })
  // @IsOptional()
  // @IsInt()
  // interiorFinishedSqFt?: number;

  // @ApiPropertyOptional({ description: 'Lot size in square feet' })
  // @IsOptional()
  // @IsInt()
  // lotSizeSqFt?: number;

  // @ApiPropertyOptional({ description: 'Number of bedrooms' })
  // @IsOptional()
  // @IsInt()
  // bedrooms?: number;

  // @ApiPropertyOptional({ description: 'Number of bathrooms' })
  // @IsOptional()
  // @IsInt()
  // bathrooms?: number;

  // @ApiPropertyOptional({ description: 'Number of stories' })
  // @IsOptional()
  // @IsInt()
  // stories?: number;

  // @ApiPropertyOptional({ description: 'Has basement' })
  // @IsOptional()
  // @IsBoolean()
  // basement?: boolean;

  // @ApiPropertyOptional({ description: 'Room types', type: [String] })
  // @IsOptional()
  // @IsArray()
  // @IsString({ each: true })
  // roomTypes?: string[];

  // @ApiPropertyOptional({ description: 'Total parking spaces' })
  // @IsOptional()
  // @IsInt()
  // totalParkingSpaces?: number;

  // @ApiPropertyOptional({ description: 'Attached garage spaces' })
  // @IsOptional()
  // @IsInt()
  // attachedGarageSpaces?: number;

  // @ApiPropertyOptional({ description: 'Street address' })
  // @IsOptional()
  // @IsString()
  // address?: string;

  // @ApiPropertyOptional({ description: 'City name' })
  // @IsOptional()
  // @IsString()
  // city?: string;

  // @ApiPropertyOptional({ description: 'Region or state' })
  // @IsOptional()
  // @IsString()
  // region?: string;

  // @ApiPropertyOptional({ description: 'ZIP code' })
  // @IsOptional()
  // @IsString()
  // zipCode?: string;

  // @ApiPropertyOptional({ description: 'Latitude' })
  // @IsOptional()
  // @IsNumber()
  // latitude?: number;

  // @ApiPropertyOptional({ description: 'Longitude' })
  // @IsOptional()
  // @IsNumber()
  // longitude?: number;

  // @ApiPropertyOptional({ description: 'Is the property for auction?' })
  // @IsOptional()
  // @IsBoolean()
  // isAuction?: boolean;

  // @ApiPropertyOptional({ description: 'Auction start date (ISO)' })
  // @IsOptional()
  // @IsDateString()
  // auctionStartDate?: string;

  // @ApiPropertyOptional({ description: 'Auction end date (ISO)' })
  // @IsOptional()
  // @IsDateString()
  // auctionEndDate?: string;

  // @ApiPropertyOptional({ description: 'Listing price' })
  // @IsOptional()
  // @IsInt()
  // price?: number;

  // @ApiPropertyOptional({ description: 'After repair value' })
  // @IsOptional()
  // @IsInt()
  // arv?: number;

  // @ApiPropertyOptional({ description: 'Rehab estimate' })
  // @IsOptional()
  // @IsInt()
  // rehabEstimate?: number;

  // @ApiPropertyOptional({ description: 'Resale value in 90 days' })
  // @IsOptional()
  // @IsInt()
  // resale90Day?: number;

  // @ApiPropertyOptional({ description: 'Price per square foot' })
  // @IsOptional()
  // @IsInt()
  // pricePerSqFt?: number;

  // @ApiPropertyOptional({ description: 'Tax assessed value' })
  // @IsOptional()
  // @IsInt()
  // taxAssessedValue?: number;

  // @ApiPropertyOptional({ description: 'Annual tax amount' })
  // @IsOptional()
  // @IsInt()
  // annualTaxAmount?: number;

  // @ApiPropertyOptional({ description: 'Listing terms', type: [String] })
  // @IsOptional()
  // @IsArray()
  // @IsString({ each: true })
  // listingTerms?: string[];

  // @ApiPropertyOptional({ description: 'Year built' })
  // @IsOptional()
  // @IsInt()
  // yearBuilt?: number;

  // @ApiPropertyOptional({ description: 'Is new construction?' })
  // @IsOptional()
  // @IsBoolean()
  // isNewConstruction?: boolean;

  // @ApiPropertyOptional({ description: 'Has fireplace?' })
  // @IsOptional()
  // @IsBoolean()
  // hasFireplace?: boolean;

  // @ApiPropertyOptional({ description: 'Property type' })
  // @IsOptional()
  // @IsString()
  // type?: string;

  // @ApiPropertyOptional({ description: 'Property subtype' })
  // @IsOptional()
  // @IsString()
  // subtype?: string;

  // @ApiPropertyOptional({ description: 'Roof type' })
  // @IsOptional()
  // @IsString()
  // roofType?: string;

  // @ApiPropertyOptional({ description: 'Construction material' })
  // @IsOptional()
  // @IsString()
  // material?: string;

  // @ApiPropertyOptional({ description: 'Heating system' })
  // @IsOptional()
  // @IsString()
  // heating?: string;

  // @ApiPropertyOptional({ description: 'Cooling system' })
  // @IsOptional()
  // @IsString()
  // cooling?: string;

  // @ApiPropertyOptional({ description: 'Appliances', type: [String] })
  // @IsOptional()
  // @IsArray()
  // @IsString({ each: true })
  // appliances?: string[];

  // @ApiPropertyOptional({ description: 'Property features', type: [String] })
  // @IsOptional()
  // @IsArray()
  // @IsString({ each: true })
  // features?: string[];

  // @ApiPropertyOptional({ description: 'Dining room features', type: [String] })
  // @IsOptional()
  // @IsArray()
  // @IsString({ each: true })
  // diningRoomFeatures?: string[];

  // @ApiPropertyOptional({ description: 'Family room features', type: [String] })
  // @IsOptional()
  // @IsArray()
  // @IsString({ each: true })
  // familyRoomFeature?: string[];

  // @ApiPropertyOptional({ description: 'Kitchen features', type: [String] })
  // @IsOptional()
  // @IsArray()
  // @IsString({ each: true })
  // kitchenRoomFeature?: string[];

  // @ApiPropertyOptional({ description: 'Parking features', type: [String] })
  // @IsOptional()
  // @IsArray()
  // @IsString({ each: true })
  // parkingFeatures?: string[];

  // @ApiPropertyOptional({ description: 'Fireplace features', type: [String] })
  // @IsOptional()
  // @IsArray()
  // @IsString({ each: true })
  // fireplaceFeatures?: string[];

  // @ApiPropertyOptional({ description: 'Dining room level' })
  // @IsOptional()
  // @IsString()
  // diningLevel?: string;

  // @ApiPropertyOptional({ description: 'Family room level' })
  // @IsOptional()
  // @IsString()
  // familyRoomLevel?: string;

  // @ApiPropertyOptional({ description: 'Kitchen level' })
  // @IsOptional()
  // @IsString()
  // kitchenLevel?: string;

  // @ApiPropertyOptional({ description: 'Living room level' })
  // @IsOptional()
  // @IsString()
  // livingRoomLevel?: string;

  // @ApiPropertyOptional({ description: 'Sewer type' })
  // @IsOptional()
  // @IsString()
  // sewer?: string;

  // @ApiPropertyOptional({ description: 'Water source' })
  // @IsOptional()
  // @IsString()
  // water?: string;

  // @ApiPropertyOptional({ description: 'Is propane rented?' })
  // @IsOptional()
  // @IsBoolean()
  // propaneRental?: boolean;

  // @ApiPropertyOptional({ description: 'Electric utility available?' })
  // @IsOptional()
  // @IsBoolean()
  // electricUtility?: boolean;

  // @ApiPropertyOptional({ description: 'Property source (manual/scraped)', enum: PropertySource })
  // @IsOptional()
  // @IsEnum(PropertySource)
  // propertySource?: PropertySource;

  // @ApiPropertyOptional({ description: 'Parcel number' })
  // @IsOptional()
  // @IsString()
  // parcelNumber?: string;

  // @ApiPropertyOptional({ description: 'Created by user ID' })
  // @IsOptional()
  // @IsString()
  // createdById?: string;

  // @ApiPropertyOptional({ description: 'deleted image ids', type: [String] })
  // @IsOptional()
  // @IsArray()
  // @IsString({ each: true })
  // deletedImageIds?: string[];

  // @ApiProperty({
  //   type: 'array',
  //   items: { type: 'string', format: 'binary' },
  //   required: false,
  //   description: 'Optional new images to upload',
  // })
  // files?: any;
}




// export class TotalUpdated extends UpdatePropertyDtoWithFiles {
//   @ApiPropertyOptional({ description: 'deleted image ids', type: [String] })
//   @IsOptional()
//   @IsArray()
//   @IsString({ each: true })
//   deletedImageIds?: string[];
// }