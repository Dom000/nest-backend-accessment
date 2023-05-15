import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { JwtStrategy } from './strategy';
import { JwtModule, JwtService } from "@nestjs/jwt";
import { TransactionRef } from '../transactions/entities/transactionref.entity';
import { Transaction } from '../transactions/entities/transaction.entity';
import { TransactionsService } from '../transactions/transactions.service';


@Module({
  imports: [TypeOrmModule.forFeature([User, TransactionRef, Transaction]), JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, UsersService, TransactionsService],
  exports: [JwtModule]
})
export class AuthModule { }
