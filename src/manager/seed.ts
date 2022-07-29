import XLSX from "xlsx";
import path from "path";
import { Words } from "../entity/Words";
import { Traits } from "../entity/Trait";
import AppDataSource from "../data-source";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

(async() => {
    try {
        // Inicializa conexão com banco de dados
        await AppDataSource.initialize();

        // Carrega dados de inicialização do arquivo
        const file = XLSX.readFile(path.join(__dirname, "data.xlsx"));
        const traits = XLSX.utils.sheet_to_json(file.Sheets["Traits"]);
        const words = XLSX.utils.sheet_to_json(file.Sheets["Words"]);

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

        console.log("Seed do banco de dados finalizada com sucesso.")

    } catch(error) {
        console.log(error);
    } finally {
        process.exit(0);
    }
})();