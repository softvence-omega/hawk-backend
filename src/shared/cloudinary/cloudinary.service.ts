import { Inject, Injectable } from "@nestjs/common";
import { Cloudinary } from "src/types/cloudinary/cloudinary.types";
import * as fs from 'fs'
import { join } from "path";

@Injectable()
export class CloudinaryService{
    constructor(
      @Inject('CLOUDINARY') private cloudinary:Cloudinary
    ){}

async uploadImage(file:Express.Multer.File){

const fileExt = file.originalname.split('.').pop()
const fileName =file.originalname.split('.')[0]
const originalFileName = `${fileName}-${Date.now()}.${fileExt}`; 
const uploadRes = await this.cloudinary.uploader.upload(file.path, {
        folder: 'Ez Deal Hub',
        public_id: originalFileName, 
      });
const imageUrl = uploadRes.secure_url;
const publicId = uploadRes.public_id;
      // Delete local file after upload
const filePath = join(process.cwd(), file.path);
if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }

return {imageUrl,publicId}

    }

async deleteImage(publicId:string){
  try {
    await this.cloudinary.uploader.destroy(publicId)
  } catch (error) {
    console.error(error)
  }
  
}

// async uploadFromUrl(url: string) {
//   const response = await axios.get(url, { responseType: 'arraybuffer' });
//   const buffer = Buffer.from(response.data, 'binary');

//   return new Promise<{ imageUrl: string; publicId: string }>((resolve, reject) => {
//     const uploadStream = this.cloudinary.uploader.upload_stream(
//       { folder: 'Ez Deal Hub' },
//       (error, result) => {
//         if (error) return reject(error);
//         resolve({ imageUrl: result.secure_url, publicId: result.public_id });
//       }
//     );

//     const stream = new Readable();
//     stream.push(buffer);
//     stream.push(null);
//     stream.pipe(uploadStream);
//   });
// }

// async uploadManyFromUrls(urls: string[]) {
//   const results = [];
//   for (const url of urls) {
//     const uploaded = await this.uploadFromUrl(url);
//     results.push(uploaded);
//   }
//   return results;
// }


}