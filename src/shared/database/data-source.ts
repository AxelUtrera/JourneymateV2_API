import * as dotenv from "dotenv";
import { DataSource } from "typeorm";

dotenv.config();

export const dataSource = new DataSource({
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT || "5432"),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    entities: [__dirname + "/../**/*.entity{.ts,.js}"],
    synchronize: false,
    migrations: [__dirname + "/../database/migrations/*{.ts,.js}"],
});
