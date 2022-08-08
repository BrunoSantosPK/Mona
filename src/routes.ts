import express from "express";
import PageController from "./controllers/page";
import FormController from "./controllers/form";

const routes = express.Router();

routes.get("/", PageController.formGamerTypes);
routes.post("/calculate", FormController.calculateByWords)

export default routes;