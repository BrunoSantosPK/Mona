import app from "../app";
import request from "supertest";
import FormController from "../controllers/form";

describe("Gerenciamento de formulários", () => {
    //beforeAll(async() => {});

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
});