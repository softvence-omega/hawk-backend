import { BadRequestException, ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from '@prisma/client';
import { CreateAdminDto } from './dto/create-admin.dto';
import * as bcrypt from 'bcrypt';
import { CloudinaryService } from 'src/shared/cloudinary/cloudinary.service';
import { Cloudinary } from 'src/types/cloudinary/cloudinary.types';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private cloudinaryService:CloudinaryService,
    @Inject('CLOUDINARY') private cloudinary: Cloudinary,
) {}

  async createAdmin(dto: CreateAdminDto) {
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existing) throw new BadRequestException('Email already in use');

     const hashedPassword = await bcrypt.hash(dto.password, parseInt(process.env.SALT_ROUND!));

    const admin = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashedPassword,
        role: Role.ADMIN,
      },
    });

    return {
      id: admin.id,
      email: admin.email,
      role: admin.role,
    };
  }

  async getAllUser() {
   const users = await this.prisma.user.findMany({
    where:{isDeleted:false},
    orderBy:{
        updatedAt:'desc'
    }
   });
   return users
  }


 async getSingleUser(id:string){
    const user = await this.prisma.user.findUnique({where:{id,isDeleted:false}})
    if (!user) throw new NotFoundException('User not found');
    return user
 }

 async updateMyProfile(id:string,dto:UpdateUserDto,file?:Express.Multer.File){
    const existingUser= await this.prisma.user.findUnique({
        where:{
            id
        }
    })
  if (!existingUser || existingUser.isDeleted || !existingUser.isActive) {
    throw new NotFoundException('User not found or is inactive/deleted');
  }

  if(existingUser.id!==id) throw new ForbiddenException("Access Denied!")

 let profileImage=existingUser.profileImage;
 let cloudinaryPublicId=existingUser.cloudinaryPublicId;
 
 if(file){
 if(cloudinaryPublicId){
    await this.cloudinary.uploader.destroy(cloudinaryPublicId);
 }
  const {imageUrl,publicId}=await this.cloudinaryService.uploadImage(file) 
  profileImage=imageUrl
  cloudinaryPublicId=publicId
 }

 const updatedUser = await this.prisma.user.update({
    where:{id},
    data:{
        name:dto.name,
        profileImage,
        cloudinaryPublicId
    }
 })
const {password,...updatedUserInfo}=updatedUser;

 return updatedUserInfo;
 }


  async updateUserStatus(id: string, isActive: boolean) {
    const user = await this.prisma.user.findUnique(
        { where: { id ,isDeleted:false} });
    if (!user) throw new NotFoundException('User not found');

    if(user.role==='SuperAdmin'){
      throw new BadRequestException("Super admin can not be blocked!")
    }

    const updatedUserStatus = await this.prisma.user.update({
      where: { id },
      data: { isActive},
    });

const {password,...updatedUserInfo}=updatedUserStatus;

 return updatedUserInfo;
  }


  async deleteUser(id:string){
    const user = await this.prisma.user.findUnique(
        { where: { id ,isDeleted:false} });
    if (!user) throw new NotFoundException('User not found');

    if(user.isDeleted){
        throw new BadRequestException('The user already deleted!')
    }

    const deletedUser = await this.prisma.user.delete({
        where:{id}
    })


const {password,...deletedUserInfo}=deletedUser;

 return deletedUserInfo;
}
    
    
}
