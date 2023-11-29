import { Module } from '@nestjs/common';
import { ClientsModule } from './modules/clients/clients.module';
import { PicturesModule } from './modules/pictures/pictures.module';

@Module({
  imports: [ClientsModule, PicturesModule],
})
export class AppModule {}
