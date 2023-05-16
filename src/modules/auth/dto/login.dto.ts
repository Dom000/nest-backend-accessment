import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Transform } from "class-transformer";
import { ApiProperty } from '@nestjs/swagger';
export default class LoginDto {

    @ApiProperty({ description: 'user email' })
    @IsEmail()
    @IsNotEmpty()
    @Transform(({ value }) => String(value).toLocaleLowerCase())
    email: string;

    @ApiProperty({ description: 'user password' })
    @IsNotEmpty()
    @IsString()
    @Transform(({ value }) => String(value).toLocaleLowerCase())
    password: string;
}