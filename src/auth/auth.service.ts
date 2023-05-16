import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
// import { AuthService } from './auth.service';
import { PrismaService } from 'prisma/prisma.service';
import * as bcrypt from 'bcrypt';
// import {PrismaService} from './src/prisma/prisma.service';

@Injectable()
export class AuthService {

    constructor(private prisma: PrismaService) { }

    // constructor(private readonly uthService: AuthService){}

    async Register(dto:AuthDto){
        try{
            const {email, password} = dto;
            const findUser = await this.prisma.user.findUnique({
                where:{email}
            })

            if(findUser){
                throw new BadRequestException('Email already registered');
            }

            const hashedPassword = await this.hashPassword(password);

            await this.prisma.user.create({
                data:{
                    email,
                    hashedPassword,
                }
            })
            return {message:'Signup successful'}            

        }catch(err){
            throw err;
        }
    }

    async Login(dto: AuthDto){
        try{
            const {email, password} = dto;
            const findUser = await this.prisma.user.findUnique({
                where:{email}
            })
            if(!findUser){
                throw new BadRequestException('Wrong credentials');
            }

            const isMatch = await this.camparePassword({
                password,
                hash: findUser.hashedPassword
            });

            if(!isMatch){
                throw new BadRequestException('Wrong credentials');

            }

            // return "LogIn";
        }catch(err){
            throw err;
        }
    }

    async Logout(){
        try{
            return "LogOut";
        }catch(err){
            throw err;
        }
    }

    async hashPassword(password:string){
        const saltOrRounds = 10;
        const hashPassword = await bcrypt.hash(password, saltOrRounds);
        return hashPassword;
    }

    async camparePassword(args:{ hash:string, password:string}){
        return await bcrypt.compare(args.hash, args.password);

    }
}
