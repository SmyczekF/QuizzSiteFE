import { Grid, Table } from "@mantine/core";
import styles from "../../Account.module.scss";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

interface QuizHistoryData {
  id: string;
  score: number;
  finishedOn: string;
  QuizId: string;
  Quiz: {
    title: string;
    description: string;
    color: string;
    Author: {
      username: string;
    };
  };
}

const QuizHistory = () => {
  const { data } = useQuery<QuizHistoryData[]>({
    queryKey: ["userQuizHistory"],
    queryFn: () => axios.get("/quizHistory/user").then((res) => res.data),
  });

  const navigate = useNavigate();

  const quizHistory = useMemo(() => {
    if (!data) return null;
    return data.map((quiz) => (
      <Table.Tr key={quiz.id}>
        <Table.Td>
          <span
            className={`pi pi-play ${styles.playIcon}`}
            onClick={() => navigate(`/quizz/${quiz.QuizId}`)}
          ></span>
        </Table.Td>
        <Table.Td>{quiz.Quiz.title}</Table.Td>
        <Table.Td>{quiz.score}%</Table.Td>
        <Table.Td>{new Date(quiz.finishedOn).toLocaleDateString()}</Table.Td>
        <Table.Td>{quiz.Quiz.Author.username}</Table.Td>
      </Table.Tr>
    ));
  }, [data, navigate]);

  return (
    <Grid gutter={"xl"}>
      <Grid.Col span={12}>
        <h3 className={styles.contentTitle}>Quizz History</h3>
        <p className={styles.contentDescription}>
          Here you can see your previously finished quizzes.
        </p>
      </Grid.Col>
      <Grid.Col span={12}>
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Play</Table.Th>
              <Table.Th>Quiz</Table.Th>
              <Table.Th>Score</Table.Th>
              <Table.Th>Finished on</Table.Th>
              <Table.Th>Author</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{quizHistory}</Table.Tbody>
        </Table>
      </Grid.Col>
    </Grid>
  );
};

export default QuizHistory;
