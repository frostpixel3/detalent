import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PrismaService } from './prisma.service';

@Injectable()
export class LoggedUserMiddleware implements NestMiddleware {
  constructor(private prisma: PrismaService) {}

  async use(req: Request & { user: any }, res: Response, next: NextFunction) {
    const bearerToken = req.headers.authorization;
    if (bearerToken) {
      const token = bearerToken.split(' ')[1];
      const user = await this.prisma.user.findFirst({
        where: {
          authTokens: {
            token: {
              equals: token,
            },
          },
        },
      });
      if (user) {
        req.user = user;
      }
    }
    next();
  }
}
