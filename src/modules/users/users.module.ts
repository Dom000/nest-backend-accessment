import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule, getDataSourceToken, getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DataSource } from 'typeorm';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '../Guard/Role.guard';
import { TransactionRef } from '../transactions/entities/transactionref.entity';
import { TransactionsService } from '../transactions/transactions.service';
import { Transaction } from '../transactions/entities/transaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User,TransactionRef,Transaction])],
  controllers: [UsersController],
  providers: [
    UsersService,TransactionsService]
})
export class UsersModule { }
