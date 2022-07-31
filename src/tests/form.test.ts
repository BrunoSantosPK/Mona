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
            expect(result.message).toBeDefined();
        });

    });
});