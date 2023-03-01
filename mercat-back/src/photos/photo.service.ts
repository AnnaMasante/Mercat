import { Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';
import { ConfigService } from '@nestjs/config';
import { BUCKET_FOLDER } from 'src/config/variables';

@Injectable()
export class PhotoService {
  constructor(private configService: ConfigService) {}

  async uploadFile(
    file: Express.Multer.File,
    folderName: string | null,
  ): Promise<string> {
    const gcs: Storage = new Storage({
      keyFilename: 'adroit-poet-316408-5dd2e70003b5.json',
      projectId: 'adroit-poet-316408',
    });
    const bucket = gcs.bucket('mercat-bucket');
    const ts = Date.now();
    const { buffer, originalname } = file;
    let imgName: string;
    if (folderName) {
      imgName = `${folderName}/${ts}_${originalname}`;
    } else {
      imgName = `${ts}_${originalname}`;
    }
    await bucket.file(imgName).save(buffer);
    return `${this.configService.get(BUCKET_FOLDER)}/${imgName}`;
  }

  async uploadFiles(
    files: Array<Express.Multer.File>,
    folderName: string | null,
  ) {
    let res: string[] = [];
    for (let file of files) {
      let out = await this.uploadFile(file, folderName);
      res.push(out);
    }
    return res;
  }

  async deleteFile(fileName: string): Promise<boolean> {
    const gcs: Storage = new Storage({
      keyFilename: 'adroit-poet-316408-5dd2e70003b5.json',
      projectId: 'adroit-poet-316408',
    });
    const bucket = gcs.bucket('mercat-bucket');
    try {
      await bucket.file(fileName).delete();
    } catch {
      return false;
    }
    return true;
  }
}
