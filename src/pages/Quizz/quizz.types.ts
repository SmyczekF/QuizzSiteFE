import { QuizzListElementProps } from "../QuizzList/quizzes.types";

export interface OptionProps {
    id: number;
    text: string;
    order: number;
    image?: Blob;
}

export interface QuestionProps {
    id: number;
    text: string;
    order: number;
    type: string;
    Options: OptionProps[];
}

export interface QuizzProps extends QuizzListElementProps {
    Questions: QuestionProps[];
}
