import { Controller, Get, Param, Req, UseGuards, Render, Res, Delete, Query, Put, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthDto, paramDto } from 'src/auth/dto/auth.dto';
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
  GetAllUsers(@Req() req, @Res() res){
    return this.usersService.getAllUser(req, res);
  }

  @Delete('/delete/:id')
  DeleteUser(@Param() params:{id:string}, @Req() req, @Res() res){
    return this.usersService.deleteUser(params.id, req, res);
  }

  @Put('/update')
  updateUser(@Param() params:{id:string}, @Req() req, @Res() res){
    try{
        return this.usersService.updateUser(params.id, req, res)
    }catch(err){
        throw err;
    }
}
}
