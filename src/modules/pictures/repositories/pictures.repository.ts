import { CreatePictureDto } from '../dto/create-picture.dto';
import { UpdatePictureDto } from '../dto/update-picture.dto';
import { Picture } from '../entities/picture.entity';

export abstract class PicturesRepository {
  abstract create(data: CreatePictureDto): Promise<Picture> | Picture;
  abstract findAll(): Promise<Picture[]> | Picture[];
  abstract findOne(id: string): Promise<Picture> | Picture;
  abstract update(
    id: string,
    data: UpdatePictureDto,
  ): Promise<Picture> | Picture;
  abstract delete(id: string): Promise<void> | void;
}
