import app from "./app";
import AppDataSource from "./data-source";

AppDataSource.initialize().then(connect => app.listen(process.env.PORT || 3030));