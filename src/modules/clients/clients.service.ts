import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { ClientsRepository } from './repositories/clients.repository';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientsService {
  constructor(private clientsRepository: ClientsRepository) {}

  async create(createClientDto: CreateClientDto) {
    const client = await this.clientsRepository.create(createClientDto);
    return client;
  }

  async findAll() {
    const clients = await this.clientsRepository.findAll();
    return clients;
  }

  async findInactiveClients() {
    const inactiveClients = await this.clientsRepository.findInactives();
    return inactiveClients;
  }

  async findOne(id: string) {
    const client = await this.clientsRepository.findOne(id);
    if (!client) {
      throw new NotFoundException('Client not found');
    }
    return client;
  }

  async findByEmail(email: string) {
    const findClient = await this.clientsRepository.findByEmail(email);
    if (!findClient) {
      throw new NotFoundException('Client not found');
    }
    return findClient;
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    const client = await this.clientsRepository.findOne(id);
    if (!client) {
      throw new NotFoundException('Client not found');
    }
    return await this.clientsRepository.update(id, updateClientDto);
  }

  async remove(id: string) {
    const client = await this.clientsRepository.findOne(id);
    if (!client) {
      throw new NotFoundException('Client not found');
    }
    return await this.clientsRepository.delete(id);
  }

  async restore(id: string) {
    const client = await this.clientsRepository.findOne(id);
    if (!client) {
      throw new NotFoundException('Client not found');
    }
    return await this.clientsRepository.restore(id);
  }
}
