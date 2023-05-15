import { IsEmail, IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { Transform } from "class-transformer";
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../entities/user.entity';
export class CreateUserDto {

    @ApiProperty({ description: 'the Email address of the user' })
    @IsNotEmpty()
    @IsEmail()
    @IsString()
    @Transform(({ value }) => value.toLowerCase())
    email: string

    @ApiProperty({ description: 'the role  of the user [user|admin] the roles are default to user , this field is optional' })
    @IsOptional()
    @IsString()
    @Transform(({ value }) => String(value).toLowerCase())
    role?: UserRole


    @IsNotEmpty()
    @IsString()
    @Transform(({ value }) => String(value).toLocaleLowerCase())
    password: string

    @ApiProperty({ description: 'the first_name of the user' })
    @IsNotEmpty()
    @IsString()
    first_name: string

    @ApiProperty({ description: 'the last_name of the user' })
    @IsNotEmpty()
    @IsString()
    last_name: string



    @ApiProperty({ description: 'the home address of the user' })
    @IsNotEmpty()
    @IsString()
    address: string



}