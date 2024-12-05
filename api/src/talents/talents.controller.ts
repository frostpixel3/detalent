import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { AuthGuard } from 'src/common/decorators/auth.guard';
import { LoggedUser } from 'src/common/decorators/logged-user.decorator';
import { PrismaService } from 'src/prisma.service';

@Controller('talents')
export class TalentsController {
  constructor(private prisma: PrismaService) {}

  @Post('/services')
  @UseGuards(AuthGuard)
  createService(
    @LoggedUser() user: User,
    @Body() body: Prisma.TalentServiceCreateInput,
  ) {
    return this.prisma.talentService.create({
      data: {
        ...body,
        talent: {
          connect: {
            id: user.id,
          },
        },
      },
    });
  }

  @Get('/services')
  @UseGuards(AuthGuard)
  getServices(@LoggedUser() user: User) {
    return this.prisma.talentService.findMany({
      where: {
        talentId: user.id,
      },
    });
  }

  @Get('/services/:id')
  @UseGuards(AuthGuard)
  getService(@Param('id') id: string, @LoggedUser() user: User) {
    return this.prisma.talentService.findFirst({
      where: {
        id,
        talentId: user.id,
      },
      include: {
        talent: true,
      },
    });
  }
}
