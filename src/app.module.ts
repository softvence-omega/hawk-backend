import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './module/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './module/user/user.module';
import { SeederService } from './seeder/seeder.service';
import { CloudinaryModule } from './shared/cloudinary/cloudinary.module';
import { PropertyModule } from './module/property/property.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    UserModule,
    CloudinaryModule,
    PropertyModule,
  ],
  controllers: [AppController],
  providers: [AppService, SeederService],
})
export class AppModule {}
