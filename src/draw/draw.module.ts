import { Module } from '@nestjs/common';
import { DrawController } from './draw.controller';
import { DrawService } from './draw.service';
import { EncryptionModule } from 'src/encryption/encryption.module';

@Module({
  imports: [EncryptionModule],
  controllers: [DrawController],
  providers: [DrawService],
})
export class DrawModule {}
