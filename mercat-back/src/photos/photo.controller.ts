import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PhotoService } from './photo.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from 'src/roles.decorator';

@UseGuards(JwtAuthGuard)
@Controller('photos')
@Roles('SELLER')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Post()
  @UseInterceptors(
    FilesInterceptor('file', 6, {
      limits: { fieldSize: 10 },
      fileFilter: (_, file, cb) => {
        if (file.mimetype == 'image/png' || file.mimetype == 'image/jpeg') {
          cb(null, true);
        } else {
          cb(
            new BadRequestException({
              error: 'image needs to be png or jpg/jpeg',
            }),
            false,
          );
        }
      },
    }),
  )
  async upload(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() bodyData: { folderName?: string },
  ) {
    return await this.photoService.uploadFiles(files, bodyData.folderName);
  }

  @Delete(':fileName')
  async deleteFile(@Param('fileName') fileName: string) {
    return await this.photoService.deleteFile(fileName);
  }
}
