import { Controller, Get } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Controller('public')
export class PublicController {
  constructor(private prisma: PrismaService) {}

  @Get('/services')
  getServices() {
    return this.prisma.talentService.findMany({
      take: 50, // TOOD: add pagination after Hackathon
      include: {
        talent: true,
      },
    });
  }
}
