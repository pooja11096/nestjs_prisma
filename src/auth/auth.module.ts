import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
// import { PrismaService } from 'src/prisma/prisma.service';


// import {PrismaService} from './prisma.service';

@Module({
  // imports: [AuthModule],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
