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
import { EQuizCategories, QuizzProps } from "../../../Quizz/quizz.types";
import { FormEvent, useCallback, useEffect, useMemo } from "react";
import { QuestionType, Quiz } from "./create-quiz.types";
import { useCreateQuizMutation } from "./components/useCreateQuiz";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useUpdateQuizMutation } from "./components/useUpdateQuiz";

const quizDataFormMapper = (quizData: QuizzProps): Quiz => ({
  id: `${quizData.id}`,
  title: quizData.title,
  description: quizData.description,
  genres: quizData.Genres.map((genre) => genre.name),
  questions: quizData.Questions.map((question) => ({
    id: question.id,
    text: question.text,
    type: question.type as QuestionType,
    order: question.order,
    options: question.Options.map((option) => ({
      id: option.id,
      text: option.text,
      isCorrect: !!option.isCorrect,
      order: option.order,
    })),
  })),
});

const CreateQuiz = () => {
  const { id } = useParams<{ id: string }>();
  const [type, setType] = React.useState<"create" | "edit">(
    id ? "edit" : "create"
  );
  const navigate = useNavigate();

  // Fetch quiz data if editing
  const { data: quizData } = useQuery<QuizzProps>({
    queryKey: ["getQuiz", id],
    queryFn: () => axios.get(`/quizz/get/${id}/edit`).then((res) => res.data),
    enabled: !!id, // Only run query if id exists
  });

  console.log("quizData", quizData);

  const notFinishedQuizCreation: Quiz = useMemo(() => {
    // If editing, don't use localStorage data
    if (id) return null;

    const quiz = localStorage.getItem("notFinishedQuizCreation");
    try {
      return quiz ? JSON.parse(quiz) : null;
    } catch (e) {
      console.error(e);
      return null;
    }
  }, [id]);

  // console.log(
  //   "quizDataFormMapper",
  //   id && quizData && quizDataFormMapper(quizData)
  // );
  // Set form initial values based on whether we're editing or creating
  const form = useForm<Quiz>({
    initialValues:
      id && quizData
        ? quizDataFormMapper(quizData)
        : notFinishedQuizCreation || {
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

  const { mutate: createMutate, isSuccess: createSuccess } =
    useCreateQuizMutation(form.values);
  const { mutate: updateMutate, isSuccess: updateSuccess } =
    useUpdateQuizMutation({ id: id || "", ...form.values });

  useEffect(() => {
    setType(id ? "edit" : "create");
    form.reset();
    if (id && quizData) {
      form.setValues(quizDataFormMapper(quizData));
    }
    if (!id && notFinishedQuizCreation) {
      form.setValues(notFinishedQuizCreation);
    }
  }, [id, quizData]);

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (type === "edit") {
      updateMutate();
    } else {
      createMutate();
    }
  };

  const handleFormReset = useCallback(() => {
    if (!id) {
      localStorage.removeItem("notFinishedQuizCreation");
    }
    form.setInitialValues({
      title: "",
      description: "",
      genres: [],
      questions: [],
    });
    form.reset();
  }, [id]);

  useEffect(() => {
    if (createSuccess || updateSuccess) {
      handleFormReset();
      navigate("/profile/my-quizzes");
    }
  }, [createSuccess, updateSuccess, handleFormReset, navigate]);

  // Only save to localStorage when creating
  useEffect(() => {
    if (!id) {
      localStorage.setItem(
        "notFinishedQuizCreation",
        JSON.stringify(form.values)
      );
    }
  }, [form.values, id]);

  const handleAddOption = (questionIndex: number) => {
    form.setFieldValue(`questions.${questionIndex}.options`, [
      ...form.values.questions[questionIndex].options,
      {
        text: "",
        isCorrect: false,
        order: form.values.questions[questionIndex].options.length + 1,
      },
    ]);
  };

  const handleAddQuestion = () => {
    form.setFieldValue("questions", [
      ...form.values.questions,
      {
        text: "",
        type: QuestionType.SINGLE_CHOICE,
        order: form.values.questions.length + 1,
        options: [
          {
            text: "",
            isCorrect: false,
            order: 1,
          },
        ],
      },
    ]);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <Grid gutter={"xl"} align="center">
        <Grid.Col span={12}>
          <h1 className={styles.contentTitle}>
            {type === "edit" ? "Edit Quiz" : "Quiz Creation Page"}
          </h1>
          <p className={styles.contentDescription}>
            {type === "edit"
              ? "Here you can edit your quiz."
              : "Here you can create your own quiz."}
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
              key: genre,
              value: genre,
              label: genre,
            }))}
            {...form.getInputProps("genres")}
          />
        </Grid.Col>
        {form.values.questions.map((question, index) => (
          <React.Fragment key={`question_${index}_header`}>
            <Grid.Col span={12}>
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
                  key: type,
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
                  onClick={() => handleAddOption(index)}
                >
                  <i className="pi pi-plus" />
                </Button>
              </Flex>
            </Grid.Col>
            {question.options.map((option, optionIndex) => (
              <React.Fragment key={`question_${index}_option_${optionIndex}`}>
                <Grid.Col span={7}>
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
              </React.Fragment>
            ))}
          </React.Fragment>
        ))}
        <Grid.Col span={12}>
          <Button fullWidth onClick={handleAddQuestion}>
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
          {type === "edit" ? "Update" : "Create"}
        </Button>
      </Flex>
    </form>
  );
};

export default CreateQuiz;
