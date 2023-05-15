import type { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export const configs: TypeOrmModuleOptions & { seeds: string[]; factories: string[] } =
{
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [
        'src/modules/**/*.entity{.ts,.js}',
    ],
    migrations: [ 'src/database/migrations/*{.ts,.js}' ],
    seeds: [ 'src/database/seeds/**/*{.ts,.js}' ],
    factories: [ 'src/database/factories/**/*{.ts,.js}' ],
    synchronize: true,

    ssl: true,
    extra: {
        ssl: {
            rejectUnauthorized: false
        }
    }
};

// module.exports = configs;
