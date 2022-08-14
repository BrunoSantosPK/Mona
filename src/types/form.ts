export type RowQuestionGroup = {
    formId: number,
    group: number,
    wordName: string,
    wordId: number,
    traitId: number
};

export type ReturnGetFormById = {
    success: boolean,
    message?: string,
    data?: Array<RowQuestionGroup>
}

export type GamerTypeCalc = {
    traitId: number,
    positive: boolean,
    gamer: string,
    score: number,
    max: number,
    description: string
}

export type ReturnGetGameTypes = {
    success: boolean,
    message?: string,
    data?: Array<GamerTypeCalc>
}