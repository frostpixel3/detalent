import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { LoggedUserMiddleware } from './logged-user.middleware';
import { PrismaService } from './prisma.service';
import { TalentsController } from './talents/talents.controller';

// IMPORTS - START
// IMPORTS - END

@Module({
  imports: [
    // MODULE IMPORTS - START
    UsersModule,
    // MODULE IMPORTS - END
  ],
  controllers: [
    // MODULE CONTROLLERS - START
    // MODULE CONTROLLERS - END
  TalentsController],
  providers: [
    // MODULE PROVIDERS - START
    PrismaService,
    // MODULE PROVIDERS - END
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggedUserMiddleware).forRoutes('*');
  }
}
