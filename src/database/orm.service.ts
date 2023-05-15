import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import type { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Transaction } from 'src/modules/transactions/entities/transaction.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { TransactionRef } from 'src/modules/transactions/entities/transactionref.entity';

@Injectable()
export class OrmService {
    constructor(private configService: ConfigService) { }
    private getValue(key: string, throwOnMissing = true): string {
        const value = this.configService.get(key);
        if (!value && throwOnMissing) {
            throw new Error(`config error - missing env.${key}`);
        }
        
        return value;
    }

    get getDefault(): TypeOrmModuleOptions {
        console.log("database connected");
        return {
            type: 'postgres',
            host: this.getValue('db.default.host'),
            port: parseInt(this.getValue('db.default.port')),
            username: this.getValue('db.default.username'),
            password: this.getValue('db.default.password'),
            database: this.getValue('db.default.name'),
            entities: [User,Transaction,TransactionRef],
            autoLoadEntities: true,
            // migrationsTableName: 'migration',
            migrations: [`${__dirname}/migrations/{.ts,.js}`],
            synchronize: true,
            ssl: true,
            extra: {
                ssl: {
                    rejectUnauthorized: false
                }
            }
        };
    }
}
