import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { Roles } from '../Decorator/Role.decorator';
import { UserRole } from './entities/user.entity';
import { RolesGuard } from '../Guard/Role.guard';
import { JwtGuard } from '../Guard/Jwt.guard';
import { ApiBadRequestResponse, ApiBasicAuth, ApiBearerAuth, ApiCreatedResponse, ApiProperty, ApiTags } from '@nestjs/swagger';
import { FundWalletDto } from './dto/fundwallet.dto';
@ApiTags("User functions")
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }
  @Post("signup")
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }


  @Post("fund-wallet")
  @UseGuards(JwtGuard)
  fundwallet(@Req() req: Request, @Body() fundwalletdto: FundWalletDto) {
    
    return this.usersService.fundwallet(req, fundwalletdto);
  }

  @Get("")
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  findAll() {
    return this.usersService.findAll();
  }


  @Get('hello')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.USER)
  findOne(@Req() req: Request) {
    return this.usersService.findOne(req);
  }


  @Patch('update')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.USER)
  update(@Req() req: Request, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(req, updateUserDto);
  }

  @ApiCreatedResponse({
    description: "ref created"
  })
  @ApiBearerAuth()
  @Get('generate-ref')
  @UseGuards(JwtGuard)
  generateRef(@Req() req: Request) {
    return this.usersService.generateRef(req);
  }


  @ApiCreatedResponse({
    description: "Your wallet balance"
  })
  @ApiBearerAuth()
  @Get('get-wallet-balance')
  @UseGuards(JwtGuard)
  getwalletBalance(@Req() req: Request) {
    return this.usersService.getwalletbalance(req);
  }



}
