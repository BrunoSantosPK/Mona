import { RowQuestionGroup } from "../types/form";
import { GroupQuestion, BaseSlide } from "../types/view";

export default class FormViewModel {

    static getSlidesForm(questions: Array<RowQuestionGroup>) {
        // Inicia a criação dos slides que serão enviados ao front-end
        const slides: Array<BaseSlide> = [];
        slides.push({
            text: "Então, preparada para descobrir qual o seu perfil gamer? Então só clicar no botão e seguir o questionário, coisa rápida, confia.",
            buttonText: "Começar",
            state: "next-page",
            showQuestions: false
        });

        // Organiza o questionário de resposta no formato de grupos (pares de questões)
        questions.forEach(itemForm => {
            let groupId = itemForm.group;
            let itemSlide = slides.find(element => element.questions?.groupId == groupId);

            if(itemSlide == undefined) {
                // Ainda não existe questão cadastrada no slide
                slides.push({
                    text: "Escolha a palavra que melhor te define",
                    buttonText: "Próximo",
                    state: "validate-next",
                    showQuestions: true,
                    questions: {
                        groupId: groupId,
                        options: [{
                            word: itemForm.wordName,
                            wordId: itemForm.wordId
                        }]
                    }
                });
            } else {
                // Já existe uma opção cadastrada, preenche a segunda
                itemSlide.questions?.options.push({
                    word: itemForm.wordName,
                    wordId: itemForm.wordId
                });
            }
        });

        // Faz a alteração do stado dos grupos existentes
        slides.forEach((item, i) => {
            if(i == slides.length - 1) {
                item.state = "validate-send";
                item.buttonText = "Calcular";
            } else if(i == slides.length - 2) {
                item.state = "validate-last";
            }
        });
        
        return slides;
    }

}