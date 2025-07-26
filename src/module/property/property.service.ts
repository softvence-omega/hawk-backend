import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';

@Injectable()
export class PropertyService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPropertyDto: CreatePropertyDto) {
    const existingProperty = await this.prisma.property.findUnique({
        where:{
            title:createPropertyDto.title
        }
    })
    if(existingProperty){
        throw new BadRequestException("The property title is already exist!")
    }
    const property = await this.prisma.property.create({
      data: createPropertyDto,
    });
    return property;
  }


  
  async findAll() {
    return this.prisma.property.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const property = await this.prisma.property.findUnique({ where: { id } });

    if (!property) {
      throw new NotFoundException('Property not found');
    }

    return property;
  }

  async update(id: string, updatePropertyDto: UpdatePropertyDto) {
    const existing = await this.findOne(id);

    return this.prisma.property.update({
      where: { id },
      data: updatePropertyDto,
    });
  }

  async remove(id: string) {
    const existing = await this.findOne(id); 

    return this.prisma.property.delete({ where: { id } });
  }
}
