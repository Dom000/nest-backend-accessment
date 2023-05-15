import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Transform } from "class-transformer";
export default class LoginDto {

    @IsEmail()
    @IsNotEmpty()
    email: string;


    @IsNotEmpty()
    @IsString()
    @Transform(({ value }) => String(value))
    password: string;
}