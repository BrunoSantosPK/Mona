import XLSX from "xlsx";
import path from "path";
import { Forms } from "../models/Forms";
import { Words } from "../models/Words";
import { Traits } from "../models/Trait";
import AppDataSource from "../data-source";
import { FormWords } from "../models/FormWords";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

(async() => {
    try {
        // Inicializa conexão com banco de dados
        await AppDataSource.initialize();

        // Carrega dados de inicialização do arquivo
        const file = XLSX.readFile(path.join(__dirname, "data.xlsx"));
        const traits = XLSX.utils.sheet_to_json(file.Sheets["Traits"]);
        const words = XLSX.utils.sheet_to_json(file.Sheets["Words"]);
        const forms = XLSX.utils.sheet_to_json(file.Sheets["Forms"]);
        const formWords = XLSX.utils.sheet_to_json(file.Sheets["FormWords"]);

        // Estrutura adição de traços de personalidade
        const newTraits: Array<QueryDeepPartialEntity<Traits>> = [];
        traits.forEach((item: any) => newTraits.push({
            Name: item.Name,
            TranslateName: item.Translate
        }));
        const resultTrait = (await AppDataSource.createQueryBuilder()
            .insert().into(Traits).values(newTraits).execute()).generatedMaps;

        // Estrutura adição das palavras utilizadas nos questionários
        const newWords: Array<QueryDeepPartialEntity<Words>> = [];
        words.forEach((item: any) => newWords.push({
            Name: item.Name,
            TraitId: resultTrait[item.TraitId - 1].Id,
            Positive: item.Positive
        }));
        await AppDataSource.createQueryBuilder().insert()
            .into(Words).values(newWords).execute();

        // Estrutura a adição dos formulários padrão do sistema
        const newForms: Array<QueryDeepPartialEntity<Forms>> = [];
        forms.forEach((item: any) => newForms.push({
            Name: item.Name
        }));
        await AppDataSource.createQueryBuilder().insert()
            .into(Forms).values(newForms).execute();

        // Faz a alocação das palavras em cada formulário
        const newFormWords: Array<QueryDeepPartialEntity<FormWords>> = [];
        formWords.forEach((item: any) => newFormWords.push({
            Group: item.Group,
            FormId: item.FormId,
            WordId: item.WordId
        }));
        await AppDataSource.createQueryBuilder().insert()
            .into(FormWords).values(newFormWords).execute();

        console.log("Seed do banco de dados finalizada com sucesso.")

    } catch(error) {
        console.log(error);
    } finally {
        process.exit(0);
    }
})();