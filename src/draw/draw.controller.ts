import { Controller, Post, Body, Get, Query, Param } from '@nestjs/common';
import { DrawService } from './draw.service';
import { EncryptionService } from 'src/encryption/encryption.service';

@Controller('draw')
export class DrawController {
  constructor(
    private readonly drawService: DrawService,
    private encryptionService: EncryptionService,
  ) {}

  @Post('generate')
  generateAll() {
    return this.drawService.generateAll();
  }

  @Get(':token')
  async draw(@Param('token') token: string) {
    const name = this.encryptionService.decrypt(token);

    return this.drawService.getMyMatch(name);
  }

  @Get('participants')
  getPartecipants() {
    return this.drawService.allName();
  }
}
