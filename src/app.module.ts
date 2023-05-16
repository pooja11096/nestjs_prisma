import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from 'prisma/prisma.module';
import { AuthService } from './auth/auth.service';
// import {UserModule} from './user/user.module';
// import {PrismaModule} from './prisma/prisma.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthModule, PrismaModule, UsersModule],
  // controllers: [AppController],
  // providers: [AppService, AuthService]
})
export class AppModule {}
