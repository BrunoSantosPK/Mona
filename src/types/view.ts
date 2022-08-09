export type StateSlide = "next-page" | "validate-next" | "validate-send" | "validate-last";

export type GroupQuestion = {
    groupId: number,
    options: Array<{
        word: string,
        wordId: number
    }>
}

export type BaseSlide = {
    text: string,
    buttonText: string,
    state: StateSlide,
    showQuestions: boolean,
    questions?: GroupQuestion
};