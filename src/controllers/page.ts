import FormController from "./form";
import { Request, Response } from "express";

type WordsGroup = {
    group: number,
    words: Array<{
        word: string,
        wordId: number
    }>
};

export default class PageController {

    static async formGamerTypes(request: Request, response: Response) {
        // Variáveis de controle
        const groups: Array<WordsGroup> = [];
        const filterForm = request.query.form ?? "1";

        try {
            // Recupera dados de questionário para exibição
            const idForm = typeof(filterForm) == "string" ? parseInt(filterForm) : 1;
            const form = await FormController.getFormById(idForm);

            if(!form.success || form.data == undefined)
                throw new Error(form.message);

            // Organiza as palavras em baterias
            for(let i = 0; i < form.data.length; i++) {
                let group = form.data[i].group;
                let item = groups.find(element => element.group == group);

                if(item == undefined) {
                    groups.push({
                        group: group,
                        words: [{word: form.data[i].wordName, wordId: form.data[i].wordId}]
                    });
                } else {
                    item.words.push({word: form.data[i].wordName, wordId: form.data[i].wordId});
                }
            }

            // Envia dados para a página
            return response.render("pages/form-gamer", {combination: groups, idForm});

        } catch(error: any) {
            // Envia para a página de erro 404
            response.status(404);
            return response.render("pages/404");
        }
    }

    /*static async calculateByPositiveWords(request: Request, response: Response) {
        const ids = request.body.words;
        const result = calcByWords(ids, 4);
        
        return response.send({
            statusCode: 200,
            data: result
        });
    }*/

}