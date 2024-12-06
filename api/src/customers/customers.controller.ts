import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { AuthGuard } from 'src/common/decorators/auth.guard';
import { LoggedUser } from 'src/common/decorators/logged-user.decorator';
import { PrismaService } from 'src/prisma.service';

interface QuoteVariables {
  serviceId: string;
  name: string;
  description: string;
}

@Controller('customers')
export class CustomersController {
  constructor(private prisma: PrismaService) {}
  @Post('/quote')
  @UseGuards(AuthGuard)
  quote(@LoggedUser() user: User, @Body() quote: QuoteVariables) {
    return this.prisma.talentServiceProject.create({
      data: {
        name: quote.name,
        description: quote.description,
        talentService: {
          connect: {
            id: quote.serviceId,
          },
        },
        customer: {
          connect: {
            id: user.id,
          },
        },
      },
    });
  }

  @Get('/projects')
  @UseGuards(AuthGuard)
  async projects(@LoggedUser() user: User) {
    return this.prisma.talentServiceProject.findMany({
      where: {
        customerId: user.id,
      },
      include: {
        talentService: {
          include: {
            talent: true,
          },
        },
      },
    });
  }

  @Get('/projects/:id')
  @UseGuards(AuthGuard)
  async project(@LoggedUser() user: User, id: string) {
    return this.prisma.talentServiceProject.findFirst({
      where: {
        id,
        customerId: user.id,
      },
      include: {
        talentService: {
          include: {
            talent: true,
          },
        },
      },
    });
  }

  @Get('/projects/:id/messages')
  @UseGuards(AuthGuard)
  async projectMessages(@LoggedUser() user: User, id: string) {
    const project = await this.prisma.talentServiceProject.findFirst({
      where: {
        id,
        customerId: user.id,
      },
    });
    if (!project) {
      throw new Error('Project not found');
    }
    return this.prisma.talentServiceProjectMessage.findMany({
      where: {
        talentServiceProjectId: id,
      },
    });
  }

  @Post('/projects/:id/messages')
  @UseGuards(AuthGuard)
  async acceptProject(
    @LoggedUser() user: User,
    @Param('id') id: string,
    @Body() { message }: { message: string },
  ) {
    const project = await this.prisma.talentServiceProject.findFirst({
      where: {
        id,
        customerId: user.id,
      },
    });
    if (!project) {
      throw new Error('Project not found');
    }
    return this.prisma.talentServiceProjectMessage.create({
      data: {
        talentServiceProject: {
          connect: {
            id,
          },
        },
        sender: 'CUSTOMER',
        message,
      },
    });
  }
}
