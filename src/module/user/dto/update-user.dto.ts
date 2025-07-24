import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
 @IsOptional()
  @IsString({ message: 'Full name must be a string' })
  name?: string;

  @IsOptional()
  profileImage?:string;

  @IsOptional()
  @ApiPropertyOptional({ type: 'string', format: 'binary' }) 
  file?: any;
}
