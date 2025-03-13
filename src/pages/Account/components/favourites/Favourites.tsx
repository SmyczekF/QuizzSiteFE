import { useQuery } from "@tanstack/react-query";
import QuizzCard from "../../../../common/QuizzCard/QuizzCard";
import styles from "./Favourites.module.scss";
import { QuizzListElementProps } from "../../../QuizzList/quizzes.types";
import axios from "axios";

// TODO: Add pagination: first we should create a global component for pagination and reuse it for every table. It exists for quiz list
const Favourites = () => {
  const { data, refetch } = useQuery<{
    quizzes: QuizzListElementProps[];
    totalCount: number;
  }>({
    queryKey: ["userMyQuizzes"],
    queryFn: () =>
      axios
        .get(
          "/quizz/favourites"
          //   {
          //   params: {
          //     page: activePage,
          //     limit: limit,
          //     order: quizQueryParams.order[0],
          //     orderDir: quizQueryParams.order[1],
          //   },
          // }
        )
        .then((res) => res.data),
  });

  return (
    <>
      <div className={styles.container}>
        {data?.quizzes
          ? data?.quizzes.map((quizz, index) => (
              <QuizzCard key={index} quizzInfo={quizz} />
            ))
          : // TODO: replace null with loading
            null}
      </div>
    </>
  );
};

export default Favourites;
