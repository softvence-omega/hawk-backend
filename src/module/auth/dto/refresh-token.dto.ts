import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class RefreshTokenDto{
    @ApiProperty({
   description:"The refresh token",
   example:"your refresh token here"
    })
    @IsString()
    refreshToken:string;
}