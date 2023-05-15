import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateTransactionDto {


    @ApiProperty({ description: 'This is the senders id', example: "1" })
    @IsNotEmpty()
    @IsString()
    sender: string

    @ApiProperty({ description: 'This is the recievers id', example: "2" })
    @IsNotEmpty()
    @IsString()
    receiver: string


    @ApiProperty({ description: 'This is the amount transacted', example: "100" })
    @IsNotEmpty()
    @IsNumber()  
    amount: number

    @ApiProperty({ description: 'This is the ref token ', example: "dev2023-05-15T16:12:46.976Z" })
    @IsNotEmpty()
    @IsString()  
    ref: string
}
