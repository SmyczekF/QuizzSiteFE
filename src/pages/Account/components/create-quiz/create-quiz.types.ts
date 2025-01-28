import { EQuizCategories } from "../../../Quizz/quizz.types";

export enum QuestionType {
  SINGLE_CHOICE = "single_choice",
  MULTIPLE_CHOICE = "multiple_choice",
}

export type Question = {
  text: string;
  type: QuestionType;
  order: number;
  options: {
    text: string;
    isCorrect: boolean;
    order: number;
  }[];
};

export type Quiz = {
  title: string;
  description: string;
  genres: EQuizCategories[];
  questions: Question[];
};
