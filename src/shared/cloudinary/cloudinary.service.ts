import { Injectable } from "@nestjs/common";
import { Cloudinary } from "src/types/cloudinary/cloudinary.types";
import * as fs from 'fs'
import { join } from "path";

@Injectable()
export class CloudinaryService{
    constructor(
        private cloudinary:Cloudinary
    ){}

async uploadImage(file:Express.Multer.File){
let imageUrl:string|undefined;
let publicId: string | undefined;
  
const fileExt = file.originalname.split('.').pop()
const fileName =file.originalname.split('.')[0]
const originalFileName = `${fileName}-${Date.now()}.${fileExt}`; 
const uploadRes = await this.cloudinary.uploader.upload(file.path, {
        folder: 'Ez Deal Hub',
        public_id: originalFileName, 
      });
imageUrl = uploadRes.secure_url;
publicId = uploadRes.public_id;
      // Delete local file after upload
const filePath = join(process.cwd(), file.path);
if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }

return {imageUrl,publicId}

    }



}