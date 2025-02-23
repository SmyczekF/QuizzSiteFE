import { Grid, Table } from "@mantine/core";
import styles from "../../Account.module.scss";

const QuizHistory = () => {
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
              <Table.Th>Quiz</Table.Th>
              <Table.Th>Score</Table.Th>
              <Table.Th>Finished on</Table.Th>
            </Table.Tr>
          </Table.Thead>
        </Table>
      </Grid.Col>
    </Grid>
  );
};

export default QuizHistory;
