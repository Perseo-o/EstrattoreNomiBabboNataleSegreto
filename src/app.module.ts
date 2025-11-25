import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DrawModule } from './draw/draw.module';
import { EncryptionModule } from './encryption/encryption.module';

@Module({
  imports: [EncryptionModule, DrawModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
