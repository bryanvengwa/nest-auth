import { DataSource, DataSourceOptions } from 'typeorm';

 
export const dataSourceOptions : DataSourceOptions={
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
     password: 'password',
    database: 'token-auth',
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/db/migrations/*.js'],
    synchronize: false,


}