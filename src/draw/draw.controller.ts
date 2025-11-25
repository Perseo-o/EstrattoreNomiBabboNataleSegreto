import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { DrawService } from './draw.service';

@Controller('draw')
export class DrawController {
  constructor(private readonly drawService: DrawService) {}

  @Post('generate')
  generateAll() {
    return this.drawService.generateAll();
  }

  @Get()
  getMyMatch(@Query('name') name: string) {
    return this.drawService.getMyMatch(name);
  }

  @Get('participants')
  getPartecipants() {
    return this.drawService.allName();
  }
}
