import { IsNotEmpty, IsString, IsEmail, Length } from 'class-validator';

export class AuthDto{
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    public email: string;

    @IsNotEmpty()
    @IsString()
    // @Length(3, 20, {message: 'password has to be at between 3 and 20 characters'})
    public password: string;
    
}   