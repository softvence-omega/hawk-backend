import {
  BadRequestException,
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
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { PropertyService } from './property.service';
import { CreatePropertyDto, CreatePropertyDtoWithFiles } from './dto/create-property.dto';
import {UpdatePropertyDtoWithFiles } from './dto/update-property.dto';
import { Request, Response } from 'express';
import sendResponse from 'src/utils/sendResponse';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { cleanDefaultSwaggerGarbage, transformMultiparPropertyBody } from 'src/utils/transform-multipart-body';

@ApiTags('Property')
@Controller('property')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  // 🔹 Create property
  @ApiOperation({ summary: 'Create a new property' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Create property with images',
    type: CreatePropertyDtoWithFiles, 
  })
  @UseInterceptors(
  FilesInterceptor('files', 10, {
    storage: diskStorage({
      destination: '/tmp',
      filename: (req, file, cb) => {
        const uniqueName = `${uuidv4()}${extname(file.originalname)}`;
        cb(null, uniqueName);
      },
    }),
  })
)
  @Post()
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  async createProperty(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() rawDto: any,
    @Req() req: Request,
    @Res() res: Response,
  ) {
  const transformed = transformMultiparPropertyBody(rawDto) as CreatePropertyDto;

  if (!req.user?.id) {
  throw new BadRequestException('User ID is missing from request');
}

  const dto = {
    ...transformed,
    createdById: req.user.id, 
  };
    const data = await this.propertyService.create(dto,files ?? []);

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


  //update property
@ApiOperation({ summary: 'Update property details' })
@ApiConsumes('multipart/form-data')
@ApiBody({
  description: 'Update property with optional new images',
  type: UpdatePropertyDtoWithFiles,

})
@UseInterceptors(
  FilesInterceptor('files', 10, {
    storage: diskStorage({
      destination: '/tmp',
      filename: (req, file, cb) => {
        const uniqueName = `${uuidv4()}${extname(file.originalname)}`;
        cb(null, uniqueName);
      },
    }),
  })
)
@Patch(':id')
@Roles(Role.ADMIN, Role.SUPER_ADMIN)
async updateProperty(
  @Param('id') id: string,
  @Body() rawDto: any,
  @UploadedFiles() files: Express.Multer.File[],
  @Res() res: Response,
) {

const dto = transformMultiparPropertyBody(rawDto);
const cleanedDto = cleanDefaultSwaggerGarbage(dto);

console.log(cleanedDto)
  const data = await this.propertyService.update(id, cleanedDto, files);

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
