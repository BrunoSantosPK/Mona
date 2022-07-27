import express from "express";
const routes = express.Router();

import PageController from "./controllers/page";

routes.get("/", PageController.formGamerTypes);
routes.post("/calc", PageController.calculateByPositiveWords);

export default routes;