import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateClientDto {
  @IsString()
  @IsNotEmpty()
  fullname: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  cpf: string;

  @IsString()
  cellphone: string;

  @IsString()
  cep: string;

  @IsString()
  state: string;

  @IsString()
  city: string;

  @IsString()
  street: string;

  @IsString()
  neighborhood: string;

  @IsString()
  addressNumber: string;

  @IsString()
  complement: string;

  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
