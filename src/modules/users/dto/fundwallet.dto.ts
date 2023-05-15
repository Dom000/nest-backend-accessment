import { IsEmail, IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class FundWalletDto {

    @ApiProperty({ description: 'the amount to fund' })
    @IsNotEmpty()
    @IsNumber()
    amount: number

    @ApiProperty({ description: 'The referance token where the money will bbe sent to' })
    @IsNotEmpty()
    @IsString()
    ref: string


}