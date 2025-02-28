import { Flex, Grid, Table } from "@mantine/core";
import styles from "../../Account.module.scss";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import useQuizzDeletionMutation from "./QuizzDeletionMutation";

interface MyQuizzesData {
  id: string;
  color: string;
  description: string;
  liked: number;
  title: string;
  createdAt: string;
  updatedAt: string;
  Genres: { name: string }[];
}

const MyQuizzes = () => {
  const { data, refetch } = useQuery<MyQuizzesData[]>({
    queryKey: ["userMyQuizzes"],
    queryFn: () => axios.get("/quizz/myQuizzes").then((res) => res.data),
  });

  const { mutate } = useQuizzDeletionMutation(refetch);

  const navigate = useNavigate();

  const quizHistory = useMemo(() => {
    if (!data) return null;
    return data.map((quiz) => (
      <Table.Tr key={quiz.id}>
        <Table.Td>
          <span
            className={`pi pi-play ${styles.playIcon}`}
            onClick={() => navigate(`/quizz/${quiz.id}`)}
          ></span>
        </Table.Td>
        <Table.Td>{quiz.title}</Table.Td>
        <Table.Td>{quiz.Genres.map((genre) => genre.name).join(", ")}</Table.Td>
        <Table.Td>{new Date(quiz.createdAt).toLocaleDateString()}</Table.Td>
        <Table.Td>{new Date(quiz.updatedAt).toLocaleDateString()}</Table.Td>
        <Table.Td>
          <Flex gap={"sm"}>
            <span
              className={`pi pi-pencil ${styles.editIcon}`}
              onClick={() => navigate(`/quizz/edit/${quiz.id}`)}
            ></span>
            <span
              className={`pi pi-trash ${styles.deleteIcon}`}
              onClick={() => mutate(quiz.id)}
            ></span>
          </Flex>
        </Table.Td>
      </Table.Tr>
    ));
  }, [data, mutate, navigate]);

  return (
    <Grid gutter={"xl"}>
      <Grid.Col span={12}>
        <h3 className={styles.contentTitle}>My Quizzes</h3>
        <p className={styles.contentDescription}>
          Here you can see all the quizzes you have created.
        </p>
      </Grid.Col>
      <Grid.Col span={12}>
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Play</Table.Th>
              <Table.Th>Quiz</Table.Th>
              <Table.Th>Genres</Table.Th>
              <Table.Th>Created At</Table.Th>
              <Table.Th>Updated At</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{quizHistory}</Table.Tbody>
        </Table>
      </Grid.Col>
    </Grid>
  );
};

export default MyQuizzes;
