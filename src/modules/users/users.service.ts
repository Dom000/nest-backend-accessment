import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import * as argon from "argon2"
import { Request } from 'express';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User) private readonly userRepo: Repository<User>) { }
  async create(createUserDto: CreateUserDto) {


    try {
      // CHECK IF USER EMAIL OR PHONE ALREADY EXIST
      const checkEmail = await this.userRepo.findOne({
        where: {
          email: createUserDto.email,
        }
      })
      console.log(checkEmail, "hh");

      if (checkEmail) {
        return {
          status: HttpStatus.CONFLICT,
          message: "Email already exists kindly login"
        }
      }

      const hashedPassword = await argon.hash(createUserDto.password);
      const user = this.userRepo.create({
        address: createUserDto.address,
        email: createUserDto.email,
        password: hashedPassword,
        first_name: createUserDto.first_name,
        last_name: createUserDto.last_name,
        role: createUserDto.role
      })
      await this.userRepo.save(user);
      console.log(user);

      return {
        status: HttpStatus.CREATED,
        message: "User created successfully",
      }
    } catch (error) {

    }

  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(email: string) {
    console.log(email);

    return await this.userRepo.findOne({ where: { email } });
  }

  async update(req: Request, updateUserDto: UpdateUserDto) {

    const updateuser = await this.userRepo.update(req.user["id"], {
      address: updateUserDto.address
    });

    return {
      status: HttpStatus.OK,
      message: "address updated"
    }
  }


  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
