import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [PrismaService],
  controllers: [UsersController],
})
export class UsersModule {}
