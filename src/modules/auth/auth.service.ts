import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import LoginDto from './dto/login.dto';
import { UsersService } from '../users/users.service';
import * as argon from "argon2"

@Injectable()
export class AuthService {

  constructor(@InjectRepository(User) private readonly userRepo: Repository<User>, private jwt: JwtService, private userService: UsersService, private config: ConfigService
  ) { }

  async signin(logindto: LoginDto) {
    try {

      const user = await this.userRepo.findOne(
        { where: { email: logindto.email.toLocaleLowerCase() } }
      );

      

      if (!user) {
        return new ForbiddenException("invalid email address");
      }
      const isValid = await argon.verify(user.password, logindto.password);

      if (!isValid) {
        return new ForbiddenException("invalid password");
      }
      delete user.password;
      return await this.generateToken(user.id, user.email);
    } catch (error) {
      throw error.message;
    }

  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  async generateToken(userId: string, email: string): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email: email,
    };


    const token = await this.jwt.signAsync(payload, {
      expiresIn: "7d",
      secret: this.config.get("jwt.access.secret"),
    });

    return {
      access_token: token,
    }
  }
}
