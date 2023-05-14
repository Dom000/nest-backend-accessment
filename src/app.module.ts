import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { AuthModule } from './modules/auth/auth.module';
import configs from '../configs';
import { AuthService } from './modules/auth/auth.service';
import { TransactionsService } from './modules/transactions/transactions.service';
import { DatabaseModule } from './database/database.module';
import { OrmService } from './database/orm.service';
import { TypeOrmModule } from '@nestjs/typeorm';



@Module({
  imports: [TypeOrmModule.forRootAsync({
    imports: [DatabaseModule],
    inject: [OrmService],
    useFactory: (ormService: OrmService) => ormService.getDefault,
  }), ConfigModule.forRoot({ load: [configs], isGlobal: true }),
    UsersModule,
    TransactionsModule,
    AuthModule],
  providers: [AuthService, TransactionsService],
})
export class AppModule { }
