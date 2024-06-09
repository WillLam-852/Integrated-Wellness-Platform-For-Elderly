class Question {
    id: number;
    questionText: string;
    options: string[];

    constructor(id: number, questionText: string, options: string[]) {
        this.id = id;
        this.questionText = questionText;
        this.options = options;
    }
}

export default Question;