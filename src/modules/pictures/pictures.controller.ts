import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PicturesService } from './pictures.service';
import { UpdatePictureDto } from './dto/update-picture.dto';
import { CreatePictureDto } from './dto/create-picture.dto';

@Controller('pictures')
export class PicturesController {
  constructor(private readonly picturesService: PicturesService) {}

  @Post('')
  create(@Body() createPictureDto: CreatePictureDto) {
    return this.picturesService.create(createPictureDto);
  }

  @Get()
  findAll() {
    return this.picturesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.picturesService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePictureDto: UpdatePictureDto,
  ) {
    return this.picturesService.update(id, updatePictureDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.picturesService.remove(id);
  }
}
