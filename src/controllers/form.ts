import AppDataSource from "../data-source";
import { Request, Response } from "express";
import { FormWords } from "../entity/FormWords";

type RowForm = {
    formId: number,
    group: number,
    wordName: string,
    wordId: number
};

type ReturnGetFormById = {
    success: boolean,
    message?: string,
    data?: RowForm[]
};

export default class FormController {

    static async getFormById(formId: number): Promise<ReturnGetFormById> {
        const result: ReturnGetFormById = { success: true };

        try {
            // Reciupera dados
            await AppDataSource.initialize();
            const data = await AppDataSource.createQueryBuilder(FormWords, "FormWords")
                .leftJoinAndSelect("FormWords.WordId", "Words")
                .where("FormWords.FormId = :id", { id: formId }).execute();

            // Verifica se algum questionário foi encontrado
            if(data.length == 0)
                throw new Error("Questionário inválido.");

            // Padroniza o envio de dados
            const send: Array<RowForm> = [];
            data.forEach((item: any) => send.push({
                formId: item.FormWords_FormId,
                group: item.FormWords_Group,
                wordId: item.Words_Id,
                wordName: item.Words_Name
            }));

            result.data = data;
            
        } catch(error: any) {
            result.success = false;
            result.message = error.message;

        } finally {
            await AppDataSource.destroy();
            return result;
        }
    }

}