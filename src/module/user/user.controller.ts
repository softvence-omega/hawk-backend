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
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import sendResponse from '../../utils/sendResponse';
import { Request, Response } from 'express';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { CreateAdminDto } from './dto/create-admin.dto';
import { ApiBody, ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';
import { fileInterceptor } from 'src/utils/fileInterceptor';
import { UpdateUserStatusDto } from './dto/update-status.dto';


@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  // create admin 
  @ApiOperation({ summary: 'create new admin' })
  @Post('admin/create')
  @Roles(Role.SUPER_ADMIN,Role.ADMIN)
  async createAdmin(@Body() dto: CreateAdminDto, @Res() res: Response) {
    const data = await this.userService.createAdmin(dto);
    return sendResponse(res, {
      statusCode: HttpStatus.CREATED,
      success: true,
      message: 'Admin created successfully',
      data,
    });
  }

  //get all user 
  @ApiOperation({ summary: 'get all user' })
  @Get()
  @Roles(Role.ADMIN,Role.SUPER_ADMIN)
  async getAllUser(@Res() res: Response) {
    const data = await this.userService.getAllUser();
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Retrive all users successfully',
      data,
    });
  }

 //get my profile
  @ApiOperation({ summary: 'get your profile' })
  @Get('my-profile')
  @Roles(Role.ADMIN,Role.SUPER_ADMIN,Role.USER)
  async getMyProfile(@Req() req:Request,@Res() res: Response) {
    const data = await this.userService.getMyProfile(req.user!.id);
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Retrive my profile successfully',
      data,
    });
  }


  //get single user 
   @ApiOperation({ summary: 'get single user profile' })
  @Get(':id')
  @Roles(Role.ADMIN,Role.SUPER_ADMIN)
  async getSingleUser(@Param('id') id:string,@Res() res: Response) {
    const data = await this.userService.getSingleUser(id);
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Retrive single user successfully',
      data,
    });
  }

 


  //update my profile 
   @ApiOperation({ summary: 'update your profile' })
  @Roles(Role.ADMIN,Role.USER,Role.SUPER_ADMIN)
  @Patch('update-profile')
  @ApiOperation({ summary: 'update user profile (file optional)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Update User Profile',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Albert Einstein' },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    fileInterceptor()
  )
  async updateMyProfile(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto:UpdateUserDto, 
    @Req() req:Request,
    @Res() res: Response
  ) {
    const data = await this.userService.updateMyProfile(req.user!.id, dto, file);
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Update user profile successfully',
      data,
    });
  }


  //update user status 
   @ApiOperation({ summary: 'update user status' })
  @Roles(Role.ADMIN,Role.SUPER_ADMIN)
  @Patch(':id/status')
  async updateUserBlockStatus(
    @Param('id') id: string,
    @Body() dto:UpdateUserStatusDto, 
    @Res() res: Response
  ) {
    const data = await this.userService.updateUserStatus(id,dto.isActive);
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Update user status successfully',
      data,
    });
  }


  //soft delete user 
  @ApiOperation({ summary: 'delete user' })
  @Delete(':id')
  @Roles(Role.SUPER_ADMIN,Role.ADMIN)
  async deleteUser(@Param('id') id:string,@Res() res: Response) {
    const data = await this.userService.deleteUser(id);
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'deleted successfully',
      data,
    });
  }
}
