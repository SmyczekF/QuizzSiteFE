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
  id?: string;
  title: string;
  description: string;
  genres: string[];
  questions: Question[];
};

export type QuizUpdate = {
  id: string;
} & Quiz;
