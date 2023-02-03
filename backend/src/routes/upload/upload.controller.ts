import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { readFileSync, unlink } from 'fs';
import { diskStorage } from 'multer';
import { supabase } from 'src/lib/supabase';
import { randomUUID } from 'crypto';
import { User } from 'src/decorators/user/user.decorator';
import { SUPABASE_URL } from 'src/constants';

@Controller('upload')
export class UploadController {
  @Post('')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public/uploads',
        filename: (_, file, cb) =>
          cb(null, `${Date.now()}-${randomUUID()}-${file.originalname}`),
      }),
    }),
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @User({ serialize: true }) { id },
  ) {
    const fileContent = readFileSync(`${process.cwd()}/${file.path}`);
    const { data, error } = await supabase.storage
      .from('images')
      .upload(`assets/${id}-${randomUUID()}-${file.filename}`, fileContent, {
        contentType: file.mimetype,
      });
    unlink(
      `${process.cwd()}/${file.path}`,
      (err) => err && console.log(`${err.message}`),
    );
    if (error) {
      throw new BadRequestException(undefined, error.message);
    }
    return {
      path: `${SUPABASE_URL}/storage/v1/object/public/images/${data.path}`,
    };
  }
}
