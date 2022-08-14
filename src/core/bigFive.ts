import { GamerTypeCalc, RowQuestionGroup } from "../types/form";

export default class BigFive {

    static calculate(questions: Array<RowQuestionGroup>, responses: Array<number>, analysisTraits: Array<GamerTypeCalc>) {
        // Encontra a pontuação máxima de cada score, dado o questionário informado
        questions.forEach(question => {
            let analysis = analysisTraits.find(element => element.traitId == question.traitId);
            if(analysis !== undefined)
                analysis.max = analysis.max + 1;
        });

        // Compila a pontuação no questionario de acordo com as respostas
        responses.forEach(wordId => {
            let question = questions.find(element => element.wordId == wordId);
            let analysis = analysisTraits.find(element => element.traitId == question?.traitId);
            if(analysis !== undefined)
                analysis.score = analysis.score + 1 / analysis.max;
        });

        // Para traços no eixo negativo, faz a devida conversão
        analysisTraits.forEach(analysis => {
            if(!analysis.positive)
                analysis.score = 1 - analysis.score
        })

        // Ordena os traços
        for(let i = 0; i < analysisTraits.length; i++) {
            for(let j = i + 1; j < analysisTraits.length; j++) {
                if(analysisTraits[i].score < analysisTraits[j].score) {
                    let pivot = analysisTraits[i];
                    analysisTraits[i] = analysisTraits[j];
                    analysisTraits[j] = pivot;
                }
            }
        }

        return {
            gamerType: analysisTraits[0].gamer,
            gamerDescription: analysisTraits[0].description
        };
    }

    static validateSelectWords(questions: Array<RowQuestionGroup>, responses: Array<number>) {
        const valids: Array<boolean> = [];
        responses.forEach(item => {
            let exist = false;
            for(let i = 0; i < questions.length; i++) {
                if(questions[i].wordId == item) {
                    exist = true;
                    break;
                }
            }
            valids.push(exist);
        });

        if(valids.find(element => element == false) == undefined) {
            return true;
        } else {
            return false;
        }
    }

    static validateConsistenceSelectWords(questions: Array<RowQuestionGroup>, responses: Array<number>) {
        const traits: Array<{traitId: number, total: number, select: number}> = [];
        questions.forEach(item => {
            let element = traits.find(iteration => iteration.traitId == item.traitId);
            let select = responses.filter(iteration => iteration == item.wordId).length;
            if(element == undefined) {
                traits.push({ traitId: item.traitId, total: 1, select });
            } else {
                element.total = element.total + 1;
                element.select = element.select + select;
            }
        });

        // Verifica se a quantidade selecionada é maior que a quantidade total possível
        let valid = true;
        traits.forEach(item => {
            if(item.select > item.total) {
                valid = false;
            }
        });

        return valid;
    }

}