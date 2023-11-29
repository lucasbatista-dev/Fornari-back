import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaServiceDatabase';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';
import { ClientsRepository } from './repositories/clients.repository';
import { ClientsPrismaRepository } from './repositories/prisma/clients-prisma.repository';

@Module({
  controllers: [ClientsController],
  providers: [
    ClientsService,
    PrismaService,
    {
      provide: ClientsRepository,
      useClass: ClientsPrismaRepository,
    },
  ],
  exports: [ClientsService],
})
export class ClientsModule {}
