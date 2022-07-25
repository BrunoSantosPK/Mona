import { Request, Response } from "express";

export default class PageController {

    static async formGamerTypes(request: Request, response: Response) {
        const words = [
            [{word: "Comunicativa", id: 1}, {word: "Empática", id: 1}],
            [{word: "Confiante", id: 1}, {word: "Criativa", id: 1}],
            [{word: "Comunicativa", id: 1}, {word: "Analítica", id: 1}],
            [{word: "Empática", id: 1}, {word: "Criativa", id: 1}],
            [{word: "Comunicativa", id: 1}, {word: "Confiante", id: 1}],
            [{word: "Analítica", id: 1}, {word: "Confiante", id: 1}],
            [{word: "Comunicativa", id: 1}, {word: "Criativa", id: 1}],
            [{word: "Empática", id: 1}, {word: "Analítica", id: 1}],
            [{word: "Analítica", id: 1}, {word: "Criativa", id: 1}],
            [{word: "Empática", id: 1}, {word: "Confiante", id: 1}]
        ];
        response.render("pages/form-gamer", {combination: words});
    }

}