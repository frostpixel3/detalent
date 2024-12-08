import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { Prisma, User } from '@prisma/client';
import * as RequestNetworkLib from '@requestnetwork/request-client.js/';
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

  @Get('/projects/:id')
  @UseGuards(AuthGuard)
  async project(@LoggedUser() user: User, @Param('id') id: string) {
    return this.prisma.talentServiceProject.findFirst({
      where: {
        id,
        talentService: {
          talentId: user.id,
        },
      },
      include: {
        talentService: {
          include: {
            talent: true,
          },
        },
        customer: true,
      },
    });
  }

  @Get('/projects/:id/messages')
  @UseGuards(AuthGuard)
  async projectMessages(@LoggedUser() user: User, @Param('id') id: string) {
    const project = await this.prisma.talentServiceProject.findFirst({
      where: {
        id,
        talentService: {
          talentId: user.id,
        },
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
        talentService: {
          talentId: user.id,
        },
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
        sender: 'TALENT',
        message,
      },
    });
  }

  @Put('/projects/:id/invoice')
  @UseGuards(AuthGuard)
  async updateInvoice(
    @LoggedUser() user: User,
    @Param('id') id: string,
    @Body()
    {
      amount,
      requestId,
      dueDate,
    }: {
      amount: string;
      requestId: string;
      dueDate: string;
    },
  ) {
    const project = await this.prisma.talentServiceProject.findFirst({
      where: {
        id,
        talentService: {
          talentId: user.id,
        },
      },
    });
    if (!project) {
      throw new Error('Project not found');
    }
    return this.prisma.talentServiceProject.update({
      where: {
        id: project.id,
      },
      data: {
        invoiceRequestId: requestId,
        invoiceAmount: amount,
        invoiceDueDate: new Date(dueDate),
        status: 'WAITING_PAYMENT',
      },
    });
  }

  @Cron(process.env.CHECK_PAYMENT_CRON_INTERVAL)
  async handleCron() {
    console.log('Checking Payment...');
    const requestClient = new RequestNetworkLib.RequestNetwork({
      nodeConnectionConfig: {
        baseURL: process.env.REQUEST_NETWORK_BASE_URL,
      },
    });

    const projects = await this.prisma.talentServiceProject.findMany({
      where: {
        status: 'WAITING_PAYMENT',
        invoiceRequestId: {
          not: null,
        },
        invoiceDueDate: {
          gte: new Date(),
        },
      },
    });

    for (const project of projects) {
      console.log('Checking project', project.id);
      const req = await requestClient.fromRequestId(project.invoiceRequestId);
      const reqData = req.getData();
      if (BigInt(reqData.balance.balance) >= BigInt(reqData.expectedAmount)) {
        console.log('Payment received');
        await this.prisma.talentServiceProject.update({
          where: {
            id: project.id,
          },
          data: {
            status: 'IN_PROGRESS',
          },
        });
      }
    }
  }
}
