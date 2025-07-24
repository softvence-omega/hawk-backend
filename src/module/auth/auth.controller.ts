import { Body, Controller, HttpStatus, Patch, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import sendResponse from '../utils/sendResponse';
import { Public } from 'src/common/decorators/public.decorators';
import { ChangePasswordDto } from './dto/change-password.dto';
import { Request, Response } from 'express';
import { ApiCookieAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

// register 
  
  @Public()
  @Post('register')
  async register(@Body() dto: RegisterDto, @Res() res: Response) {
    const result = await this.authService.register(dto);
   const {user, accessToken, refreshToken }=result;
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
    data: { user,accessToken}, 
  });
  }


  // login 
  @Public()
  @Post('login')
  async login(@Body() dto: LoginDto, @Res() res: Response) {
    const result = await this.authService.login(dto);
    const {user, accessToken, refreshToken }=result;
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
    data: { user,accessToken}, 
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
  @Patch('change-password')
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
