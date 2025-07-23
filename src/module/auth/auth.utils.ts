// src/auth/utils/auth-utils.ts
import { JwtService } from '@nestjs/jwt';

export async function getTokens(
  jwtService: JwtService,
  userId: string,
  email: string,
  role: string,
) {
  const [access_token, refresh_token] = await Promise.all([
    jwtService.signAsync({ id: userId, email, role }, {
      secret: process.env.ACCESS_TOKEN_SECRET,
      expiresIn: process.env.ACCESS_TOKEN_EXPIREIN,
    }),
    jwtService.signAsync({ id: userId, email, role }, {
      secret: process.env.REFRESH_TOKEN_SECRET,
      expiresIn: process.env.REFRESH_TOKEN_EXPIREIN,
    }),
  ]);

  return { access_token, refresh_token };
}


