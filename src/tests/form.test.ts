import app from "../app";
import request from "supertest";
import FormController from "../controllers/form";
import AppDataSource from "../data-source";

describe("Gerenciamento de formulários", () => {
    beforeAll(async() => {
        await AppDataSource.initialize();
    });

    //afterAll(async() => {});

    describe("GET Recuperação de dados para um questionário", () => {

        it("Acessa formulário existente no banco de dados", async() => {
            const result = await FormController.getFormById(1);
            expect(result.success).toBe(true);
            expect(result.data?.length).toBe(20);
        });

        it("Tenta acessar formulário não existente no banco de dados", async() => {
            const result = await FormController.getFormById(0);
            expect(result.success).toBe(false);
            expect(result.message).toBe("Questionário inválido.");
        });

    });

    describe("GET Acesso das páginas para formulário de tipo de jogador", () => {

        it("Recupera página de questionário para tipo de jogador", async() => {
            const result = await request(app).get("/");
            expect(result.statusCode).toBe(200);
        });

        it("Falha na criação da página de questionário de tipo de jogador", async() => {
            const result = await request(app).get("/?form=0");
            expect(result.statusCode).toBe(404);
        });

    });

    describe("POST Realiza o cálculo de tipo de jogador", () => {
        
        it("Falha - Envio de palavras não presentes no questionário", async() => {
            const result = await request(app).post("/calculate").send({
                ip: "adfasdfa",
                formId: 1,
                duration: 360,
                words: [5, 9, 2, 6, 14, 3, 7, 12, 4, 25]
                //words: [5, 9, 2, 6, 14, 3, 7, 12, 4, 8]
            });
            expect(result.body).toEqual(expect.objectContaining({
                statusCode: 444,
                message: "As palavras enviadas não pertencem ao questionário."
            }));
        });

        it("Falha - Seleção de palavra em excesso de um questionário", async() => {
            const result = await request(app).post("/calculate").send({
                ip: "adfasdfa",
                formId: 1,
                duration: 360,
                words: [5, 9, 2, 6, 14, 8, 8, 8, 8, 8]
            });

            expect(result.body).toEqual(expect.objectContaining({
                statusCode: 444,
                message: "As respostas não estão consistentes com o questionário."
            }));
        });

        it("Sucesso - Cálculo correto do tipo Socializador", async() => {
            const result = await request(app).post("/calculate").send({
                ip: "adfasdfa",
                formId: 1,
                duration: 360,
                words: [1, 2, 3, 4, 9, 11, 20, 7, 18, 8]
            });

            expect(result.body.message).toBe("");
            expect(result.body.statusCode).toBe(200);
            expect(result.body.data.gamerType).toBe("Socializador");
        });

        it("Sucesso - Cálculo correto do tipo Conquistador", async() => {
            const result = await request(app).post("/calculate").send({
                ip: "adfasdfa",
                formId: 1,
                duration: 360,
                words: [5, 9, 19, 6, 14, 3, 7, 18, 4, 8]
            });
            
            expect(result.body.message).toBe("");
            expect(result.body.statusCode).toBe(200);
            expect(result.body.data.gamerType).toBe("Conquistador");
        });

        it("Sucesso - Cálculo correto do tipo Explorador", async() => {
            const result = await request(app).post("/calculate").send({
                ip: "adfasdfa",
                formId: 1,
                duration: 360,
                words: [1, 13, 19, 11, 14, 3, 15, 18, 16, 17]
            });
            
            expect(result.body.message).toBe("");
            expect(result.body.statusCode).toBe(200);
            expect(result.body.data.gamerType).toBe("Explorador");
        });

        it("Sucesso - Cálculo correto do tipo Competidor", async() => {
            const result = await request(app).post("/calculate").send({
                ip: "adfasdfa",
                formId: 1,
                duration: 360,
                words: [1, 13, 19, 6, 14, 3, 15, 18, 4, 8]
            });
            
            expect(result.body.message).toBe("");
            expect(result.body.statusCode).toBe(200);
            expect(result.body.data.gamerType).toBe("Competidor");
        });

    });

});