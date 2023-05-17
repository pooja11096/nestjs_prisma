import { Body,Controller,Get, Post, Render, Request, Response, UseGuards} from '@nestjs/common';
import { AuthService } from './auth.service';
import {AuthDto} from './dto/auth.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  // constructor(private readonly authService: AuthService) {}
  constructor(private authService: AuthService) {}

  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Request() req){}


  @Get('/google')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Request() req, @Response() res){
    return this.authService.googleAuth( req, res);
  }


  @Get('/register')
  @Render('register')
  RegisterPage(){
    return {message:'page rendered'};
  }
  
  @Get('/login')
  @Render('login')
  LoginPage(){
    return {message:'login page rendered'};
  }

  @Post('register')
  Register(@Body() dto:AuthDto,@Request() req, @Response() res){
    return this.authService.Register(dto, req, res)

    // res.redirect('/login')
  }

  
  @Post('login')
  @Render('login')
  Login(@Request() req, @Response() res, @Body() dto:AuthDto){
    return this.authService.Login(dto, req, res);

  }

  @Get('logout')
  LogOut(@Request() req, @Response() res){
    return this.authService.Logout(req, res)
  }
}
