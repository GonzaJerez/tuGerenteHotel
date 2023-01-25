import "reflect-metadata"
import { DataSource } from "typeorm";
import {Reservation} from "./entity/Reservation";
import {Invoice} from "./entity/Invoice";
import {Room} from "./entity/Room";

import dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "db",
    username: "postgres",
    port: 5432,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    // logging: false,
    entities: [Reservation, Invoice, Room],
    migrations: [],
    subscribers: [],
})