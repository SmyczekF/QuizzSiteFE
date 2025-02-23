import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { showErrorNotification } from "../../../shared/notifications/showErrorNotification";
import { showWarnNotification } from "../../../shared/notifications/showWarnNotification";
const useLikeQuizMutation = (queriesToInvalidate: string[]) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => axios.post(`/quizz/like/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queriesToInvalidate });
    },
    onError: (error: AxiosError) => {
      if (error.status === 401) {
        showWarnNotification(`You need to be logged in to like a quiz.`);
      } else {
        showErrorNotification(`Quiz like failed.`);
      }
    },
  });
};

export default useLikeQuizMutation;
