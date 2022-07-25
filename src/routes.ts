import express from "express";
const routes = express.Router();

routes.get("/", (req, res) => res.send("olá, estou ok"));

export default routes;