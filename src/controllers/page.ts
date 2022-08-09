import FormController from "./form";
import { Request, Response } from "express";
import { GroupQuestion } from "../types/view";
import FormViewModel from "../view-models/form";

export default class PageController {

    static async formGamerTypes(request: Request, response: Response) {
        // Variáveis de controle
        const groups: Array<GroupQuestion> = [];
        const filterForm = request.query.form ?? "1";

        try {
            // Recupera dados de questionário para exibição
            const idForm = typeof(filterForm) == "string" ? parseInt(filterForm) : 1;
            const form = await FormController.getFormById(idForm);

            if(!form.success || form.data == undefined)
                throw new Error(form.message);

            // Solicita a criação de slides para carga
            const slides = FormViewModel.getSlidesForm(form.data);

            // Envia dados para a página
            //return response.render("pages/form-gamer", {combination: groups, idForm});
            return response.render("pages/simple-form", { slides, idForm });

        } catch(error: any) {
            // Envia para a página de erro 404
            response.status(404);
            return response.render("pages/404");
        }
    }

}