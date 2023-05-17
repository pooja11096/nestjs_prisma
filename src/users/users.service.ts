import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Request, Response } from 'express';

@Injectable()
export class UsersService {

constructor(private prisma:PrismaService){}

async getUserByid(id:string, req: Request, res: Response){
    try{
        // const decodedUserInfo = req.user as { id: string; email: string };
        // const decodedUserInfo = req.user as { id: string; email: string };

        const findUser =  await this.prisma.user.findUnique({where:{id}})

        if (!findUser) {
            throw new NotFoundException();
          }
      
        //   if (findUser.id !== decodedUserInfo.id) {
        //     throw new ForbiddenException();
        //   }
      
        //   delete findUser.hashedPassword;
      
          return { user: findUser };

    }catch(err){
        throw err;
    }
}

async getAllUser(req: Request, res: Response){
    try{
        const users = await this.prisma.user.findMany({ select:{ id:true, email:true}, where:{roles:'User'}} );
        console.log(users);
        
        res.render('admin',{users});
        return {users};
    }catch(err){
        throw err
    }
}


async deleteUser(id:string, req: Request, res: Response){
    try{
        return await this.prisma.user.delete({where:{id:id}})
    }catch(err){
        throw err;
    }
}

async updateUser(id:string, req: Request, res: Response){
    try{
        return await this.prisma.user.update({
            data:{
                email:"test@mail.com",
            },
            where:{id:id}
        })
    }
    catch(err){
        throw err;
    }
}
}