import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../users/entities/user.entity';
import { Repository } from 'typeorm';
// import { PrismaService } from '../../../modules/prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(config: ConfigService, @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('jwt.access.secret'),
    });
  }

  async validate(payload: {
    sub: string,
    email: string }) {
    const data = await this.userRepo.findOne({
      where: {
        id: payload.sub
      }
      // , relations: {
      //   transactionref: true, transactions: true
      // }

    });

    if (!data) {
      throw new UnauthorizedException();
    }
    // console.log(data, 'datas');
    delete data.password
    return { ...data }
  }
}
