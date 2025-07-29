import { Body, Controller, HttpStatus, Patch, Post, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import sendResponse from '../../utils/sendResponse';
import { Public } from 'src/common/decorators/public.decorators';
import { ChangePasswordDto } from './dto/change-password.dto';
import { Request, Response } from 'express';
import { ApiBody, ApiConsumes, ApiCookieAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { fileInterceptor } from 'src/utils/fileInterceptor';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from '@prisma/client';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

// register 
  @Public()
  @Post('register')
  @ApiOperation({ summary: 'Register user with an profileImage (file optional)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Register User',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Albert Einstein' },
        email: { type: 'string', example: 'user@gmail.com' },
        password: { type: 'string', example: '123456' },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
      required: ['email','password'],
    },
  })
    @UseInterceptors(
      fileInterceptor()
    )
  async register(@UploadedFile() file: Express.Multer.File,@Body() dto: RegisterDto, @Res() res: Response) {
    const result = await this.authService.register(dto,file);
   const {user, accessToken, refreshToken }=result;
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
const {password,...userInfo}= user
  return sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: 'Register successful',
    data: { userInfo,accessToken}, 
  });
  }


  // login 
  @ApiOperation({ summary: 'Login user' })
  @Public()
  @Post('login')
  async login(@Body() dto: LoginDto, @Res() res: Response) {
    const result = await this.authService.login(dto);
    const {user, accessToken, refreshToken }=result;
    const {password,...userInfo}= user
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: 'Login successful',
    data: { userInfo,accessToken}, 
  });
  }

  // refresh token 
@ApiOperation({ summary: 'Refresh access token' })
@ApiResponse({ status: 200, description: 'Tokens refreshed' })
@ApiCookieAuth() 
@Public()
@Post('refresh-token')
async refreshToken(@Req() req: Request, @Res() res: Response) {
  const refreshToken = req.cookies?.refreshToken;

  if (!refreshToken) {
    return sendResponse(res, {
      statusCode: HttpStatus.UNAUTHORIZED,
      success: false,
      message: 'Refresh token not found in cookies',
      data: null,
    });
  }

  const result = await this.authService.refreshTokens(refreshToken);
  return sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: 'Token refreshed',
    data: result,
  });
}



  
  // change password 
  @ApiOperation({ summary: 'Change your password' })
  @Patch('change-password')
  @Roles(Role.SUPER_ADMIN,Role.ADMIN,Role.USER)
  async changePassword(@Body() dto: ChangePasswordDto, @Req() req: Request, @Res() res: Response) {
    const result = await this.authService.changePassword(req.user!.email, dto);
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Password changed',
      data: result,
    });
  }

}
