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

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }
  @Post("signup")
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }



  @Get('hello')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.USER)
  findOne(@Req() req: Request) {
    return req.user;
  }


  @Patch('update')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.USER)
  update(@Req() req: Request, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(req, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
