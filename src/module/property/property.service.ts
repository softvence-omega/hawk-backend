import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CloudinaryService } from 'src/shared/cloudinary/cloudinary.service';
import { Prisma } from '@prisma/client';
import { UpdatePropertyDtoWithFiles } from './dto/update-property.dto';

@Injectable()
export class PropertyService {
  constructor(
    private readonly prisma: PrismaService,
    private cloudinary:CloudinaryService
  ) {}

async create(dto:Prisma.PropertyUncheckedCreateInput, files: Express.Multer.File[]) {
  const isExist = await this.prisma.property.findUnique({ where: { title:dto.title } });

    if (isExist) {
      throw new ConflictException('The property title is already exist!');
    }

  // 1. Upload all images to Cloudinary
 const imageUploads = files?.length
  ? await Promise.all(files.map((file) => this.cloudinary.uploadImage(file)))
  : [];

  const auctionCountdown =
  dto.auctionEndDate
    ? Math.floor((new Date(dto.auctionEndDate).getTime() - Date.now()) / 1000)
    : null;

const dom = 0;

const { files: _files, ...cleanDto } = dto as any;;
  // 2. Create the property first
  const property = await this.prisma.property.create({
    data: {
      ...cleanDto,
      auctionCountdown,
      dom
    },
  });

  // 3. Insert images in PropertyImage table
  const imageRecords = imageUploads.map(({ imageUrl, publicId }) => ({
    propertyId: property.id,
    imageUrl,
    publicId,
  }));

  if (imageRecords.length > 0) {
  await this.prisma.propertyImage.createMany({ data: imageRecords });
}


  // 4. Return property with images
  return this.prisma.property.findUnique({
    where: { id: property.id },
    include: { images: true },
  });
}



  
  async findAll() {
    return this.prisma.property.findMany({
      orderBy: { createdAt: 'desc' },
      include:{images:true}
    });
  }

  async findOne(id: string) {
    const property = await this.prisma.property.findUnique({ where: { id } 
    ,include:{images:true}});

    if (!property) {
      throw new NotFoundException('Property not found');
    }

    return property;
  }

async update(
  id: string,
  dto: UpdatePropertyDtoWithFiles,
  files: Express.Multer.File[],
) {
  const existing = await this.findOne(id);

  // 1. Handle deleted image IDs
  if (dto.deletedImageIds?.length) {
    await Promise.all(
      dto.deletedImageIds.map((imageId) => this.removePropertyImage(existing.id, imageId))
    );
  }

  // 2. Upload new images if provided
  let imageRecords: { propertyId: string; imageUrl: string; publicId: string }[] = [];

  if (files.length > 0) {
    const imageUploads = await Promise.all(
      files.map((file) => this.cloudinary.uploadImage(file))
    );

    imageRecords = imageUploads.map(({ imageUrl, publicId }) => ({
      propertyId: id,
      imageUrl,
      publicId,
    }));

    await this.prisma.propertyImage.createMany({ data: imageRecords });
  }

    console.log('Update DTO in service:', dto);

  // 3. Update property details
  const { deletedImageIds, files: _, ...updateFields } = dto;



  const property = await this.prisma.property.update({
    where: { id },
    data: updateFields,
    include: { images: true },
  });

  return property;
}


async remove(propertyId: string) {
  const isExist =await this.findOne(propertyId);

  const images = await this.prisma.propertyImage.findMany({
    where: { propertyId },
  });

  // Delete from Cloudinary
  await Promise.all(
    images.map((img) => this.cloudinary.deleteImage(img.publicId))
  );

  // Delete records
  await this.prisma.propertyImage.deleteMany({ where: { propertyId } });

  // Delete property
 return await this.prisma.property.delete({ where: { id: propertyId } });
}


//delete property image
async removePropertyImage(propertyId: string, imageId: string) {
  const image = await this.prisma.propertyImage.findUnique({ where: { id: imageId } });
  console.log(image,'propertyId:',propertyId)
  if (!image || image.propertyId !== propertyId) {
    throw new NotFoundException('Image not found for this property');
  }

  await this.cloudinary.deleteImage(image.publicId);
  await this.prisma.propertyImage.delete({ where: { id: imageId } });
}


}
