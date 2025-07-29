import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';

export const fileInterceptor=()=>{
    return FileInterceptor('file', {
          storage: diskStorage({
           destination: '/tmp',
            filename: (req, file, cb) => {
              const uniqueName = `${uuidv4()}${extname(file.originalname)}`;
              cb(null, uniqueName);
            },
          }),
        })
}