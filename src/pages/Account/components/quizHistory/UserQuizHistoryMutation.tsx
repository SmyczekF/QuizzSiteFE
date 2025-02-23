import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useUserQuizHistoryQuery = () => {
  return useQuery({
    queryKey: ["userQuizHistory"],
    queryFn: () => axios.get("/quizHistory/user").then((res) => res.data),
  });
};

export default useUserQuizHistoryQuery;
