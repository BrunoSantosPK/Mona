import BigFive from "../core/bigFive";
import AppDataSource from "../data-source";
import { Request, Response } from "express";
import CustomResponse from "../core/response";
import { FormWords } from "../models/FormWords";
import { GamerTypes } from "../models/GamerTypes";
import { RowQuestionGroup, ReturnGetFormById, ReturnGetGameTypes, GamerTypeCalc } from "../types/form";

export default class FormController {

    static async calculateByWords(request: Request, response: Response) {
        // Variáveis de controle
        const send = new CustomResponse();
        const { ip, formId, duration, words } = request.body;

        try {
            // Acessa questionário informado
            const questions = await FormController.getFormById(formId);
            if(!questions.success || questions.data == undefined)
                throw new Error(questions.message);

            // Verifica se as respostas são válidas
            const validResponse = BigFive.validateSelectWords(questions.data, words);
            if(!validResponse)
                throw new Error("As palavras enviadas não pertencem ao questionário.");

            // Verifica a consistência das respostas enviadas
            const validConsistence = BigFive.validateConsistenceSelectWords(questions.data, words);
            if(!validConsistence)
                throw new Error("As respostas não estão consistentes com o questionário.");

            // Recupera regras para cálculo de tipo de jogador
            const gamerRules = await FormController.getGamerTypes();
            if(!gamerRules.success || gamerRules.data == undefined)
                throw new Error("Não foi possível recuperar as regras de cálculo do servidor.");

            // Calcula e recupera o principal arquétipo de jogador
            const resultCalc = BigFive.calculate(questions.data, words, gamerRules.data);
            send.setAttr("gamerType", resultCalc.gamerType);
            send.setAttr("gamerDescription", resultCalc.gamerDescription);

        } catch(error: any) {
            send.setStatus(444);
            send.setMessage(error.message);

        } finally {
            return response.json(send.getJSON());
        }
    }

    static async getFormById(formId: number): Promise<ReturnGetFormById> {
        const result: ReturnGetFormById = { success: true };

        try {
            // Recupera dados
            const data = await AppDataSource.createQueryBuilder(FormWords, "FormWords")
                .leftJoinAndSelect("FormWords.WordId", "Words")
                .leftJoinAndSelect("Words.TraitId", "Traits")
                .where("FormWords.FormId = :id", { id: formId }).execute();

            // Verifica se algum questionário foi encontrado
            if(data.length == 0)
                throw new Error("Questionário inválido.");

            // Padroniza o envio de dados
            const send: Array<RowQuestionGroup> = [];
            data.forEach((item: any) => send.push({
                formId: item.FormWords_FormId,
                group: item.FormWords_Group,
                wordId: item.Words_Id,
                wordName: item.Words_Name,
                traitId: item.Traits_Id
            }));

            result.data = send;
            
        } catch(error: any) {
            result.success = false;
            result.message = error.message;

        } finally {
            return result;
        }
    }

    static async getGamerTypes(): Promise<ReturnGetGameTypes> {
        // Inicializa sistema de retorno
        const result: ReturnGetGameTypes = { success: true };
        const send: Array<GamerTypeCalc> = [];

        try {
            // Recupera dados
            const data = await AppDataSource.createQueryBuilder(GamerTypes, "GamerTypes").execute();

            // Estrutura dados para serem enviados
            data.forEach((item: any) => send.push({
                max: 0,
                score: 0,
                gamer: item.GamerTypes_Name,
                positive: item.GamerTypes_Positive,
                traitId: item.GamerTypes_TraitId,
                description: item.GamerTypes_Description
            }));
            result.data = send;

        } catch(error: any) {
            result.success = false;
            result.message = error.message;

        } finally {
            return result;
        }
    }

}