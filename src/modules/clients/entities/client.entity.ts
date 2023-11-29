import { randomUUID } from 'crypto';

export class Client {
  readonly id: string;
  fullname: string;
  email: string;
  cpf: string;
  cellphone: string;
  cep: string;
  state: string;
  city: string;
  street: string;
  neighborhood: string;
  addressNumber: string;
  complement: string;

  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  constructor() {
    this.id = randomUUID();
    this.createdAt = new Date();
    this.updatedAt = this.createdAt;
    this.deletedAt = null;
  }
}
