import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ClientsRepository } from '../clients.repository';
import { PrismaService } from 'src/database/PrismaServiceDatabase';
import { CreateClientDto } from '../../dto/create-client.dto';
import { UpdateClientDto } from '../../dto/update-client.dto';
import { Client } from '../../entities/client.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ClientsPrismaRepository implements ClientsRepository {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateClientDto): Promise<Client> {
    const client = new Client();
    Object.assign(client, {
      ...data,
    });

    const newClient = await this.prisma.client.create({
      data: { ...client },
    });
    return plainToInstance(Client, newClient);
  }
  async findAll(): Promise<Client[]> {
    const clients = await this.prisma.client.findMany({
      where: {
        deletedAt: null,
      },
    });

    return plainToInstance(Client, clients);
  }
  async findInactives(): Promise<Client[]> {
    const clients = await this.prisma.client.findMany({
      where: {
        deletedAt: {
          not: null,
        },
      },
    });
    return plainToInstance(Client, clients);
  }
  async findOne(id: string): Promise<Client> {
    const client = await this.prisma.client.findUnique({
      where: { id },
    });
    return plainToInstance(Client, client);
  }
  async findByEmail(email: string): Promise<Client> {
    const client = await this.prisma.client.findFirst({
      where: { email },
    });
    return client;
  }
  async update(id: string, data: UpdateClientDto): Promise<Client> {
    const client = await this.prisma.client.update({
      where: { id },
      data: { ...data },
    });
    return plainToInstance(Client, client);
  }
  async delete(id: string): Promise<void> {
    await this.prisma.client.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
  async restore(id: string): Promise<Client> {
    const client = await this.prisma.client.findUnique({
      where: { id },
    });
    if (!client) {
      throw new NotFoundException('Client not found');
    }
    if (!client.deletedAt) {
      throw new BadRequestException(
        'The client account is not marked as deleted.',
      );
    }
    const restoredClient = await this.prisma.client.update({
      where: { id },
      data: {
        deletedAt: null,
      },
    });

    return plainToInstance(Client, restoredClient);
  }
}
