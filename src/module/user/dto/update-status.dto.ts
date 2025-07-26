import { IsBoolean, IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserStatusDto {
  @ApiProperty({
    example: true,
    description: 'Update User Status',
  })
  @IsNotEmpty({ message: 'isActive is required!' })
  @IsBoolean()
  isActive: boolean;

 
}
