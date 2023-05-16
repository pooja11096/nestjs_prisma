import { Body,Controller,Get, Post} from '@nestjs/common';
import { AuthService } from './auth.service';
import {AuthDto} from './dto/auth.dto';``

@Controller('auth')
export class AuthController {
  // constructor(private readonly authService: AuthService) {}
  constructor(private authService: AuthService) {}

  @Post('register')
  Register(@Body() dto:AuthDto){
    return this.authService.Register(dto)
  }

  @Get('login')
  Login(@Body() dto:AuthDto){
    return this.authService.Login(dto)

  }

  @Get('logout')
  LogOut(){
    return this.authService.Logout()
  }
}
