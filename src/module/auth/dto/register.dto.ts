import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';


export class RegisterDto {
  @ApiPropertyOptional({
    example: 'John Doe',
    description: 'Optional name of the user',
  })
  @IsOptional()
  @IsString({ message: 'Full name must be a string' })
  name?: string;

  @ApiProperty({
    example: 'user@example.com',
    description: 'User email address',
  })
  @IsNotEmpty({ message: 'Email is required!' })
  @IsEmail({}, { message: 'Email must be valid!' })
  email: string;

  @IsOptional()
  profileImage?:string;

  @ApiProperty({
    example: 'strongPassword123',
    description: 'Password with at least 6 characters',
  })
  @IsNotEmpty({ message: 'Password is required!' })
  @IsString({ message: 'Password must be a string' })
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password: string;

}
