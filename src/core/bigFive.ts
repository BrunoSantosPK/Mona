import { RowQuestionGroup } from "../types/form";

export default class BigFive {

    static calculate(questions: Array<RowQuestionGroup>, responses: Array<number>) {
        // Define or arquétipos a partir dos traços
        // TODO: transferir essa funcionalidade para as entidades
        const analysisTraits = [
            {traitId: 1, positive: true, gamer: "Socializador", score: 0, max: 0},
            {traitId: 2, positive: true, gamer: "Conquistador", score: 0, max: 0},
            {traitId: 3, positive: false, gamer: "Competidor", score: 0, max: 0},
            {traitId: 4, positive: true, gamer: "Explorador", score: 0, max: 0}
        ];

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
                analysis.score = analysis.score + 1;
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
            gamerDescription: `Você é um ${analysisTraits[0].gamer}`
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

const words = [
    {word: "Comunicativa", id: 1, direction: "positive", traitId: 1},
    {word: "Empática", id: 2, direction: "positive", traitId: 3},
    {word: "Confiante", id: 3, direction: "positive", traitId: 5},
    {word: "Criativa", id: 4, direction: "positive", traitId: 4},
    {word: "Analítica", id: 5, direction: "positive", traitId: 2}
];

const traits = [
    {id: 1, name: "Extraversion", translate: "Extroversão"},
    {id: 2, name: "Conscientiousness", translate: "Lógica"},
    {id: 3, name: "Agreeableness", translate: "Humanidade"},
    {id: 4, name: "Openness", translate: "Criatividade"},
    {id: 5, name: "Emotional Stability", translate: "Estabilidade Emocional"}
];

const gamerTypes = [
    {type: "Socializador", description: "Você é um socializador!"},
    {type: "Conquistador", description: "Você é um conquistador!"},
    {type: "Competidor", description: "Você é um competidor!"},
    {type: "Explorador", description: "Você é um explorador!"}
];

export function calcByWords(wordsId: Array<number>, maxScore: number) {
    const analysisTraits = [
        {traitId: 1, direction: "positive", gamer: "Socializador", score: 0},
        {traitId: 2, direction: "positive", gamer: "Conquistador", score: 0},
        {traitId: 3, direction: "negative", gamer: "Competidor", score: 0},
        {traitId: 4, direction: "positive", gamer: "Explorador", score: 0}
    ];

    analysisTraits.forEach(item => {
        let marks = 0;
        wordsId.forEach(wordId => {
            let filter = words.find(element => element.id == wordId);
            if(filter !== undefined) {
                if(filter.traitId == item.traitId) {
                    marks++;
                }
            }
        });
        marks /= maxScore;
        if(item.direction == "positive") {
            item.score = marks;
        } else {
            item.score = 1 - marks;
        }
    });

    // Faz o ranking do maior para o menor
    for(let i = 0; i < analysisTraits.length; i++) {
        for(let j = i + 1; j < analysisTraits.length; j++) {
            if(analysisTraits[j].score > analysisTraits[i].score) {
                let pivot = analysisTraits[i];
                analysisTraits[i] = analysisTraits[j];
                analysisTraits[j] = pivot;
            }
        }
    }

    return gamerTypes.find(element => element.type == analysisTraits[0].gamer);
}