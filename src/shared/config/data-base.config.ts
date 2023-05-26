import { IDatabaseConfig } from '../interfaces/index';

export const databaseConfig: IDatabaseConfig = {
    development: {
        username: process.env.POSTGRES_USER || 'localhost',
        password: process.env.POSTGRES_PASSWORD || '$ta99Ath0',
        database: process.env.POSTGRES_DB || 'postgres',
        host: process.env.DB_HOST || '127.0.0.1',
        port: Number(process.env.POSTGRES_PORT) || 5432,
        dialect: 'postgres',
        logging: false,
        force: true,
        timezone: '+02:00'
    }
};
