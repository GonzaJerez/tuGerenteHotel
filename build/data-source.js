"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
console.log(process.env.DB_PASSWORD);
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    username: "postgres",
    port: 5432,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    // synchronize: true,
    // logging: false,
    entities: [],
    migrations: [],
    subscribers: [],
});
//# sourceMappingURL=data-source.js.map