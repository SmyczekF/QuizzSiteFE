import { RadioProps } from "@mantine/core";
import { QuizzListElementProps } from "../QuizzList/quizzes.types";

export interface OptionProps {
    id: string;
    text: string;
    order: number;
    image?: Blob;
    correct?: boolean;
    correctNotChoosen?: boolean;
}

export interface QuestionProps {
    id: number;
    text: string;
    order: number;
    type: string;
    Options: OptionProps[];
    active: boolean;
    returnAnswer: (quizzId: number, answerId: number | null, answerIds: number[] | null) => void;
    viewMode: boolean;
    answers?: Answers;
    correctAnswers?: Answers;
    isCorrect?: boolean;
    notAnswered?: boolean;
}

export interface Answers {
    questionId: number;
    answerId: number | null;
    answerIds: number[] | null;
}

export interface QuizFinishProps {score: number}

export interface QuizzProps extends QuizzListElementProps {
    Questions: QuestionProps[];
}

export enum EQuestionTypes {
    SingleChoice = "single_choice",
    MultipleChoice = "multiple_choice",
    Text = "text",
}

export interface ReplayButtonProps{
    onClick: () => void;
}