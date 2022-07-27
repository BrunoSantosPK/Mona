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