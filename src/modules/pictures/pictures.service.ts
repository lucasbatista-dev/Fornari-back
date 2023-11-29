import { Injectable, NotFoundException } from '@nestjs/common';
import { PicturesRepository } from './repositories/pictures.repository';
import { CreatePictureDto } from './dto/create-picture.dto';
import { UpdatePictureDto } from './dto/update-picture.dto';

@Injectable()
export class PicturesService {
  constructor(private picturesRepository: PicturesRepository) {}

  async create(createPictureDto: CreatePictureDto) {
    const picture = await this.picturesRepository.create(createPictureDto);
    return picture;
  }

  async findAll() {
    const pictures = await this.picturesRepository.findAll();
    return pictures;
  }

  async findOne(id: string) {
    const picture = await this.picturesRepository.findOne(id);
    if (!picture) {
      throw new NotFoundException('Picture not found');
    }
    return picture;
  }

  async update(id: string, updatePictureDto: UpdatePictureDto) {
    const picture = await this.picturesRepository.findOne(id);
    if (!picture) {
      throw new NotFoundException('Picture not found');
    }
    return await this.picturesRepository.update(id, updatePictureDto);
  }

  async remove(id: string) {
    const picture = await this.picturesRepository.findOne(id);
    if (!picture) {
      throw new NotFoundException('Picture not found');
    }
    return await this.picturesRepository.delete(id);
  }
}
