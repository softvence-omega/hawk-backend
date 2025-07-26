import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { PropertyService } from './property.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { Request, Response } from 'express';
import sendResponse from 'src/utils/sendResponse';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('Property')
@Controller('property')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  // 🔹 Create property
  @ApiOperation({ summary: 'Create a new property' })
  @Post()
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  async createProperty(
    @Body() dto: CreatePropertyDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const data = await this.propertyService.create({
      ...dto,
      createdById: req.user!.id,
    });

    return sendResponse(res, {
      statusCode: HttpStatus.CREATED,
      success: true,
      message: 'Property created successfully',
      data,
    });
  }

  // 🔹 Get all properties
  @ApiOperation({ summary: 'Get all properties' })
  @Get()
  async getAllProperties(@Res() res: Response) {
    const data = await this.propertyService.findAll();
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'All properties retrieved successfully',
      data,
    });
  }

  // 🔹 Get single property
  @ApiOperation({ summary: 'Get a single property' })
  @Get(':id')
  async getPropertyById(@Param('id') id: string, @Res() res: Response) {
    const data = await this.propertyService.findOne(id);
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Property retrieved successfully',
      data,
    });
  }

  // 🔹 Update property
  @ApiOperation({ summary: 'Update property details' })
  @Patch(':id')
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  async updateProperty(
    @Param('id') id: string,
    @Body() dto: UpdatePropertyDto,
    @Res() res: Response,
  ) {
    const data = await this.propertyService.update(id, dto);
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Property updated successfully',
      data,
    });
  }

  // 🔹 Delete property
  @ApiOperation({ summary: 'Delete a property' })
  @Delete(':id')
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  async deleteProperty(@Param('id') id: string, @Res() res: Response) {
    const data = await this.propertyService.remove(id);
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Property deleted successfully',
      data,
    });
  }
}
