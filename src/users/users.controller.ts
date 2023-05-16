import { Controller, Get, Param, Req, UseGuards, Render, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('render')
  @Render('index')
  RenderPage(){
    return {message:'page rendered'};
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  GetUserById(@Param() params:{id:string}, @Req() req, @Res() res){
   return this.usersService.getUserByid(params.id, req, res)

  }

  @Get()
  GetAllUsers(){
    return this.usersService.getAllUser();
  }
}
