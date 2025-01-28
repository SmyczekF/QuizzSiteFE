import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Quiz } from "../create-quiz.types";
import { showSuccessNotification } from "../../../../../shared/notifications/showSuccessNotification";
import { showErrorNotification } from "../../../../../shared/notifications/showErrorNotification";

export const useCreateQuizMutation = (quiz: Quiz) =>
  useMutation<AxiosResponse, AxiosError>({
    mutationFn: () => axios.post("/quizz/add", quiz),
    onSuccess: (data: AxiosResponse) => {
      showSuccessNotification(`Quiz added successfully!.`);
    },
    onError: (error) => {
      showErrorNotification(error.request.response || `Quiz addition failed.`);
    },
  });
