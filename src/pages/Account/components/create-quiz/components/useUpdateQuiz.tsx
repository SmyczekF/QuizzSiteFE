import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { QuizUpdate } from "../create-quiz.types";
import { showSuccessNotification } from "../../../../../shared/notifications/showSuccessNotification";
import { showErrorNotification } from "../../../../../shared/notifications/showErrorNotification";

export const useUpdateQuizMutation = (quiz: QuizUpdate) =>
  useMutation<AxiosResponse, AxiosError>({
    mutationFn: () => axios.post(`/quizz/update/${quiz.id}`, quiz),
    onSuccess: (data: AxiosResponse) => {
      showSuccessNotification(`Quiz updates successfully!.`);
    },
    onError: (error) => {
      showErrorNotification(error.request.response || `Quiz update failed.`);
    },
  });
