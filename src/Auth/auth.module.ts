import { Module } from '@nestjs/common';
import { SignInController } from './auth.controller';
import { SignInService } from './auth.service';
import { IAuthenticationRepositories } from '../Infrastructure/Repositories/Auth/IAuthentication-repositories';
import { PrismaAuthenticationRepositories } from '../Infrastructure/Repositories/Auth/prisma-authentication-repositories';
import { PrismaService } from '../Infrastructure/Database/prisma-service';
import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from './Guards/jwt-auth-guard';
@Module({
  imports: [],
  controllers: [
    SignInController
  ],
  providers: [
    PrismaService,
    SignInService,
    {
        provide: IAuthenticationRepositories,
        useClass: PrismaAuthenticationRepositories
    },
    {
        provide: APP_GUARD,
        useClass: JwtAuthGuard
    }
  ],
})
export class AuthModule {}
