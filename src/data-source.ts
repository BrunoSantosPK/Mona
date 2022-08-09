import path from "path";
import { config } from "dotenv";
import { DataSource } from "typeorm";
import { Forms } from "./models/Forms";
import { Words } from "./models/Words";
import { Traits } from "./models/Trait";
import { FormWords } from "./models/FormWords";

config({ path: path.join(__dirname, "..", "config", ".env") });

const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT as string),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: true,
    entities: [Traits, Words, Forms, FormWords],
    ssl: true,
    extra: {
        ssl: {
            rejectUnauthorized: false,
        }
    }
});

export default AppDataSource;