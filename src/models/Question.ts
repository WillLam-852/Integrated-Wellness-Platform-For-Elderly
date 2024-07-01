class Question {
    id: number;
    questionTextEn: string;
    optionsEn: string[];
    questionTextZh: string;
    optionsZh: string[];


    constructor(id: number, questionTextEn: string, optionsEn: string[], questionTextZh: string, optionsZh: string[]) {
        this.id = id;
        this.questionTextEn = questionTextEn;
        this.optionsEn = optionsEn;
        this.questionTextZh = questionTextZh;
        this.optionsZh = optionsZh;
    }
}

export default Question;