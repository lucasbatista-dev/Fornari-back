import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaServiceDatabase';
import { PicturesController } from './pictures.controller';
import { PicturesService } from './pictures.service';
import { PicturesRepository } from './repositories/pictures.repository';
import { PicturesPrismaRepository } from './repositories/prisma/pictures-prisma.repository';

@Module({
  controllers: [PicturesController],
  providers: [
    PicturesService,
    PrismaService,
    {
      provide: PicturesRepository,
      useClass: PicturesPrismaRepository,
    },
  ],
  exports: [PicturesService],
})
export class PicturesModule {}
