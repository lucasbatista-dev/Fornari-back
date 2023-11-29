import { Injectable } from '@nestjs/common';
import { PicturesRepository } from '../pictures.repository';
import { PrismaService } from 'src/database/PrismaServiceDatabase';

import { plainToInstance } from 'class-transformer';
import { CreatePictureDto } from '../../dto/create-picture.dto';
import { Picture } from '../../entities/picture.entity';
import { UpdatePictureDto } from '../../dto/update-picture.dto';

@Injectable()
export class PicturesPrismaRepository implements PicturesRepository {
  constructor(private prisma: PrismaService) {}
  async create(data: CreatePictureDto): Promise<Picture> {
    const picture = new Picture();
    Object.assign(picture, {
      ...data,
    });

    const newPicture = await this.prisma.picture.create({
      data: { ...picture },
    });
    return plainToInstance(Picture, newPicture);
  }
  async findAll(): Promise<Picture[]> {
    const pictures = await this.prisma.picture.findMany();

    return plainToInstance(Picture, pictures);
  }

  async findOne(id: string): Promise<Picture> {
    const picture = await this.prisma.picture.findUnique({
      where: { id },
    });
    return plainToInstance(Picture, picture);
  }

  async update(id: string, data: UpdatePictureDto): Promise<Picture> {
    const picture = await this.prisma.picture.update({
      where: { id },
      data: { ...data },
    });
    return plainToInstance(Picture, picture);
  }
  async delete(id: string): Promise<void> {
    await this.prisma.picture.delete({
      where: { id },
    });
  }
}
