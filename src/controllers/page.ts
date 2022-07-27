import { Request, Response } from "express";

export default class PageController {

    static async formGamerTypes(request: Request, response: Response) {
        const words = [
            [{word: "Comunicativa", id: 1}, {word: "Empática", id: 2}],
            [{word: "Confiante", id: 3}, {word: "Criativa", id: 4}],
            [{word: "Comunicativa", id: 1}, {word: "Analítica", id: 5}],
            [{word: "Empática", id: 2}, {word: "Criativa", id: 4}],
            [{word: "Comunicativa", id: 1}, {word: "Confiante", id: 3}],
            [{word: "Analítica", id: 5}, {word: "Confiante", id: 3}],
            [{word: "Comunicativa", id: 1}, {word: "Criativa", id: 4}],
            [{word: "Empática", id: 2}, {word: "Analítica", id: 5}],
            [{word: "Analítica", id: 5}, {word: "Criativa", id: 4}],
            [{word: "Empática", id: 2}, {word: "Confiante", id: 3}]
        ];
        response.render("pages/form-gamer", {combination: words});
    }

}