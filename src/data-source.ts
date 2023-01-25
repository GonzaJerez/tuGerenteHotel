import "reflect-metadata"
import { DataSource } from "typeorm";

import dotenv from 'dotenv';

dotenv.config();


export const AppDataSource = new DataSource({
    type: "postgres",
    host: (process.env.NODE_ENV == 'development') ? 'localhost' : 'db',
    username: "postgres",
    port: 5432,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    // logging: false,
    entities: [__dirname + '/entity/*.entity{.ts,.js}'],
    migrations: [],
    subscribers: [],
})