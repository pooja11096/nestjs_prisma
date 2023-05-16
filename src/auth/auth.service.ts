import { BadRequestException, ForbiddenException, Injectable} from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
// import { AuthService } from './auth.service';
import { PrismaService } from 'prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { jwtSecret } from 'src/utils/constants';
import { Request,Response} from 'express';
// import {PrismaService} from './src/prisma/prisma.service';

@Injectable()
export class AuthService {

    constructor(private prisma: PrismaService, private  jwt: JwtService) { }

   

    async Register(dto:AuthDto, req: Request, res: Response ){
        try{
            console.log(dto);
            
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
            // return {message:'Signup successful'}            
            // return res.send({message:'Signup successful'})
            res.redirect('/auth/login');

        }catch(err){
            throw err;
        }
    }

    async Login(dto: AuthDto, req: Request, res: Response){
        try{
            const {email, password} = dto;
            const findUser = await this.prisma.user.findUnique({
                where:{email}
            })
            console.log('finduser');
            
            if(!findUser){
                throw new BadRequestException('Wrong credentials');
            }

            const isMatch = await this.camparePassword({
                password,
                hash: findUser.hashedPassword
            });
            console.log('usermatch');

            if(!isMatch){
                throw new BadRequestException('Wrong credentials');
            }
            console.log('after');
            
            const token = await this.setToken({userId: findUser.id, email: findUser.email});

            if(!token){
                throw new ForbiddenException('Counld not signin')
            }
            res.cookie('token', token, {});

            return res.send({ message:'Login successful'})
           
        }catch(err){
            throw err;
        }
    }

    async Logout(req: Request, res: Response){
        try{
            res.clearCookie('token');
            return res.send({ message:'Logout successful'});
            // return "LogOut";
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
        return await bcrypt.compare(args.password, args.hash);

    }

    async setToken(args:{ userId:string, email:string}){
       const payload = args;

       const token = this.jwt.signAsync(payload, {secret: jwtSecret})
        return token;
    }

    async googleAuth(req){
        if(!req.user){
            return "no user from google";
        }

        return{
            message: "user info from google"
        }
    }
}
