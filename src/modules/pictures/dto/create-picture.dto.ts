import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreatePictureDto {
  @IsString()
  @IsNotEmpty()
  url: string;

  @IsUUID()
  @IsNotEmpty()
  clientId: string;
}
