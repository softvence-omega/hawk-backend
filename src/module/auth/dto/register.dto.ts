import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';



export class RegisterDto {
 
  @IsOptional()
  @IsString({ message: 'Full name must be a string' })
  name?: string;

  @IsNotEmpty({ message: 'Email is required!' })
  @IsEmail({}, { message: 'Email must be valid!' })
  email: string;


  @IsOptional()
  profileImage?:string;

  @IsNotEmpty({ message: 'Password is required!' })
  @IsString({ message: 'Password must be a string' })
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password: string;

  @IsOptional()
  @ApiPropertyOptional({ type: 'string', format: 'binary' }) // For Swagger
  file?: any;

}
