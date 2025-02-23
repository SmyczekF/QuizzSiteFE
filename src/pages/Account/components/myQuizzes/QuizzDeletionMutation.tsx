import { useMutation } from "@tanstack/react-query";
import { showSuccessNotification } from "../../../../shared/notifications/showSuccessNotification";
import { showErrorNotification } from "../../../../shared/notifications/showErrorNotification";
import axios, { AxiosError } from "axios";

const useQuizzDeletionMutation = (refetchCallback: Function) => {
  return useMutation({
    mutationFn: (id: string) => axios.delete(`/quizz/${id}`),
    onSuccess: () => {
      showSuccessNotification(`Quiz deleted successfully!.`);
      refetchCallback();
    },
    onError: (error: AxiosError) => {
      showErrorNotification(error.request.response || `Quiz deletion failed.`);
    },
  });
};

export default useQuizzDeletionMutation;
