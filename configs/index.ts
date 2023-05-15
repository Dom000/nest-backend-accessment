import * as dotenv from 'dotenv';
dotenv.config();
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';



export default () => ({

    app: {
        environment:
            process.env.NODE_ENV === 'production'
                ? 'production'
                : process.env.APP_ENV,
        port: parseInt(process.env.APP_PORT, 10) || 3000,
        host: 'localhost',
        name: process.env.APP_NAME || "nestbackend",
        url: process.env.APP_URL,
        global_url_prefix: process.env.GLOBAL_URL_PREFIX || '/',
        full_url: `${process.env.NODE_ENV === 'production' ? process.env.APP_URL :process.env.APP_URL}`,
    },
    db: {
        default: {
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT, 10) || 5432,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            name: process.env.DB_NAME,
        },
    },

    jwt: {
        access: {
            secret: process.env.MY_JWT_SECRET,
            signInOptions: {
                expiresIn: process.env.JWT_ACCEESS_EXPIRES_IN,
            },
        },
        // refresh: {
        //     secret: process.env.JWT_SECRET,
        //     signInOptions: {
        //         expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
        //     },
        // },
    },

    cors: {
        origin: process.env.CORS_ORIGIN || '*',
        methods: process.env.CORS_METHODS || 'GET,HEAD',
        headers: process.env.CORS_HEADERS || '*',
    },
});