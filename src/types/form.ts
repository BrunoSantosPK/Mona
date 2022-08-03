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