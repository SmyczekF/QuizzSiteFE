import {
  Button,
  Checkbox,
  Flex,
  Grid,
  MultiSelect,
  Select,
  TextInput,
} from "@mantine/core";
import styles from "../../Account.module.scss";
import { useForm } from "@mantine/form";
import { EQuizCategories } from "../../../Quizz/quizz.types";
import { FormEvent, useCallback, useEffect, useMemo } from "react";
import { QuestionType, Quiz } from "./create-quiz.types";
import { useCreateQuizMutation } from "./components/useCreateQuiz";

const CreateQuiz = () => {
  const notFinishedQuizCreation: Quiz = useMemo(() => {
    const quiz = localStorage.getItem("notFinishedQuizCreation");
    try {
      return quiz ? JSON.parse(quiz) : null;
    } catch (e) {
      console.error(e);
      return null;
    }
  }, []);

  const form = useForm<Quiz>({
    initialValues: notFinishedQuizCreation || {
      title: "",
      description: "",
      genres: [],
      questions: [],
    },
    validate: {
      title: (value) => (/^\w{3,}$/.test(value) ? null : "Title is too short"),
      description: (value) =>
        /^\w{3,}$/.test(value) ? null : "Description is too short",
      genres: (value) =>
        value.length > 0 ? null : "Select at least one genre",
      questions: (value) =>
        value.length > 0 ? null : "Add at least one question",
    },
  });

  const { mutate, isSuccess } = useCreateQuizMutation(form.values);

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate();
  };

  const handleFormReset = useCallback(() => {
    localStorage.removeItem("notFinishedQuizCreation");
    form.reset();
  }, [form]);

  useEffect(() => {
    if (isSuccess) handleFormReset();
  }, [isSuccess, handleFormReset]);

  useEffect(() => {
    localStorage.setItem(
      "notFinishedQuizCreation",
      JSON.stringify(form.values)
    );
  }, [form.values]);

  return (
    <form onSubmit={handleFormSubmit}>
      <Grid gutter={"xl"} align="center">
        <Grid.Col span={12}>
          <h1 className={styles.contentTitle}>Quiz creation page</h1>
          <p className={styles.contentDescription}>
            Here you can create your own quiz.
          </p>
        </Grid.Col>
        <Grid.Col span={4} className={styles.row}>
          <p className={styles.rowText}>Title</p>
        </Grid.Col>
        <Grid.Col span={8}>
          <TextInput
            required
            placeholder="Title"
            {...form.getInputProps("title")}
          />
        </Grid.Col>
        <Grid.Col span={4} className={styles.row}>
          <p className={styles.rowText}>Description</p>
        </Grid.Col>
        <Grid.Col span={8}>
          <TextInput
            required
            placeholder="Description"
            {...form.getInputProps("description")}
          />
        </Grid.Col>
        <Grid.Col span={4} className={styles.row}>
          <p className={styles.rowText}>Category</p>
        </Grid.Col>
        <Grid.Col span={8}>
          <MultiSelect
            required
            placeholder="Select genres"
            data={Object.values(EQuizCategories).map((genre) => ({
              value: genre,
              label: genre,
            }))}
            {...form.getInputProps("genres")}
          />
        </Grid.Col>
        {form.values.questions.map((question, index) => (
          <>
            <Grid.Col span={12} key={`question_${index}_header`}>
              <div className={styles.questionHeader}>
                <h2 className={styles.questionHeaderText}>
                  Question {index + 1}
                </h2>
                <Button
                  color="red"
                  size="xs"
                  style={{ fontSize: "1rem" }}
                  onClick={() =>
                    form.setFieldValue(
                      `questions`,
                      form.values.questions.filter((_, i) => i !== index)
                    )
                  }
                >
                  <i className="pi pi-trash" />
                </Button>
              </div>
            </Grid.Col>
            <Grid.Col span={4} key={`question_${index}_text`}>
              <p className={styles.rowText}>Question</p>
            </Grid.Col>
            <Grid.Col span={8} key={`question_${index}_text_input`}>
              <TextInput
                required
                placeholder={`Question ${index + 1}`}
                value={question.text}
                onChange={(event) =>
                  form.setFieldValue(
                    `questions.${index}.text`,
                    event.currentTarget.value
                  )
                }
              />
            </Grid.Col>
            <Grid.Col span={4} key={`question_${index}_type`}>
              <p className={styles.rowText}>Type</p>
            </Grid.Col>
            <Grid.Col span={8} key={`question_${index}_type_input`}>
              <Select
                required
                placeholder="Select question type"
                data={Object.values(QuestionType).map((type) => ({
                  value: type,
                  label: type,
                }))}
                value={question.type}
                onChange={(value) =>
                  form.setFieldValue(`questions.${index}.type`, value)
                }
              />
            </Grid.Col>
            <Grid.Col span={7} key={`question_${index}_options_header`}>
              <p className={styles.rowText}>Option</p>
            </Grid.Col>
            <Grid.Col span={3} key={`question_${index}_correct_header`}>
              <p className={styles.rowText}>Is correct?</p>
            </Grid.Col>
            <Grid.Col span={2} key={`question_${index}_add_option`}>
              <Flex justify="flex-end">
                <Button
                  style={{ fontSize: "1em" }}
                  size="xs"
                  onClick={() =>
                    form.setFieldValue(`questions.${index}.options`, [
                      ...question.options,
                      {
                        text: "",
                        isCorrect: false,
                        order: question.options.length + 1,
                      },
                    ])
                  }
                >
                  <i className="pi pi-plus" />
                </Button>
              </Flex>
            </Grid.Col>
            {question.options.map((option, optionIndex) => (
              <>
                <Grid.Col
                  span={7}
                  key={`question_${index}_option_${optionIndex}_text_input`}
                >
                  <TextInput
                    required
                    placeholder={`Option ${optionIndex + 1}`}
                    value={option.text}
                    onChange={(event) =>
                      form.setFieldValue(
                        `questions.${index}.options.${optionIndex}.text`,
                        event.currentTarget.value
                      )
                    }
                  />
                </Grid.Col>
                <Grid.Col
                  span={3}
                  key={`question_${index}_option_${optionIndex}_correct_input`}
                >
                  <Checkbox
                    placeholder="Is correct?"
                    checked={option.isCorrect}
                    onChange={(e) =>
                      form.setFieldValue(
                        `questions.${index}.options.${optionIndex}.isCorrect`,
                        e.target.checked
                      )
                    }
                  />
                </Grid.Col>
                <Grid.Col
                  span={2}
                  key={`question_${index}_option_${optionIndex}`}
                >
                  <Flex justify="flex-end">
                    <Button
                      color="red"
                      size="xs"
                      style={{ fontSize: "1em" }}
                      onClick={() =>
                        form.setFieldValue(
                          `questions.${index}.options`,
                          form.values.questions[index].options.filter(
                            (_, i) => i !== optionIndex
                          )
                        )
                      }
                    >
                      <i className="pi pi-trash" />
                    </Button>
                  </Flex>
                </Grid.Col>
              </>
            ))}
          </>
        ))}
        <Grid.Col span={12}>
          <Button
            fullWidth
            onClick={() =>
              form.setFieldValue("questions", [
                ...form.values.questions,
                {
                  text: "",
                  type: QuestionType.SINGLE_CHOICE,
                  order: form.values.questions.length + 1,
                  options: [],
                },
              ])
            }
          >
            <i
              className="pi pi-plus"
              style={{ fontSize: "1em", marginRight: "5px" }}
            />
            Add question
          </Button>
        </Grid.Col>
      </Grid>
      <Flex justify="end" gap={20} mt={20} mb={50}>
        <Button color="red" onClick={handleFormReset}>
          Cancel
        </Button>
        <Button type="submit" color="yellow">
          Create
        </Button>
      </Flex>
    </form>
  );
};

export default CreateQuiz;
