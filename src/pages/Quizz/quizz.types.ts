import { RadioProps } from "@mantine/core";
import { QuizzListElementProps } from "../QuizzList/quizzes.types";

export interface OptionProps {
    id: string;
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

export enum EQuestionTypes {
    SingleChoice = "single_choice",
    MultipleChoice = "multiple_choice",
    Text = "text",
}