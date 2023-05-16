import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { GoogleStrategy } from './google.strategy';
// import { PrismaService } from 'src/prisma/prisma.service';


// import {PrismaService} from './prisma.service';

@Module({
  imports: [JwtModule],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy]
})
export class AuthModule {}
