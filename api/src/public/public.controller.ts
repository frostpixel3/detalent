import { Controller, Get } from '@nestjs/common';
import { User } from '@prisma/client';
import { LoggedUser } from 'src/common/decorators/logged-user.decorator';
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

  @Get('/me')
  getMe(@LoggedUser() user: User) {
    return user;
  }
}
