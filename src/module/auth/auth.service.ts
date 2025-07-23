import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { ChangePasswordDto } from './dto/change-password.dto';
import {getTokens } from './auth.utils';


@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}


// register 

async register(dto: RegisterDto) {
  const existingUser = await this.prisma.user.findUnique({
    where: { email: dto.email },
  });

  if (existingUser) {
    throw new BadRequestException('Email is already registered!');
  }

  const hashedPassword = await bcrypt.hash(dto.password, parseInt(process.env.SALT_ROUND!));

  const newUser = await this.prisma.user.create({
    data: {
      name: dto.name,
      email: dto.email,
      profileImage:dto.profileImage,
      password: hashedPassword,
    },
  });

  const tokens = await getTokens(this.jwtService,newUser.id, newUser.email, newUser.role);
  return { user: newUser, ...tokens };
}




// login 
  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });

    if (!user || !user.password) {
      throw new ForbiddenException('Invalid credentials');
    }
    if(user.isDeleted){
        throw new NotFoundException("user doesn't exist!");
    }
    if(!user.isActive){
        throw new BadRequestException('User is blocked!');
    }

    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) {
      throw new ForbiddenException('Invalid credentials');
    }

    const tokens = await getTokens(this.jwtService,user.id, user.email, user.role);
    return { user, ...tokens };
  }


// refresh token 
  async refreshTokens(token: string) {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.REFRESH_TOKEN_SECRET,
      });

      const user = await this.prisma.user.findUnique({ where: { email: payload.email,isDeleted:false } });
      if (!user) throw new UnauthorizedException('Invalid refresh token');
      if(!user.isActive){
       throw new BadRequestException('User is blocked!');
      }
      if(user.isDeleted){
        throw new NotFoundException("user doesn't exist!");
      }
      return getTokens(this.jwtService,user.id, user.email, user.role);
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }


// change password 
  async changePassword(email: string, dto: ChangePasswordDto) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user || !user.password) {
      throw new NotFoundException('User not found');
    }
  if(!user.isActive){
      throw new BadRequestException('User is blocked!');
  }
   if(user.isDeleted){
        throw new NotFoundException("user doesn't exist!");
    }
    const isMatch = await bcrypt.compare(dto.oldPassword, user.password);
    if (!isMatch) {
      throw new BadRequestException('Old password is incorrect');
    }

    if (dto.newPassword !== dto.confirmPassword) {
      throw new BadRequestException("Passwords don't match");
    }

    const hashed = await bcrypt.hash(dto.newPassword, parseInt(process.env.SALT_ROUND!) );
    await this.prisma.user.update({
      where: { email },
      data: { password: hashed },
    });

    return { message: 'Password changed successfully' };
  }







 
}
