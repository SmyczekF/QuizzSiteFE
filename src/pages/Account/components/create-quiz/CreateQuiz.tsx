import {
  Button,
  Checkbox,
  FileInput,
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
import PictureInput from "../../../../shared/customInputs/pictureInput/PictureInput";
import { returnImage } from "../../../../shared/images/ImageReader";

const quizDataFormMapper = (quizData: QuizzProps): Quiz => ({
  id: `${quizData.id}`,
  title: quizData.title,
  image: returnImage(quizData.image),
  description: quizData.description,
  genres: quizData.Genres.map((genre) => genre.name),
  questions: quizData.Questions.map((question) => ({
    id: question.id,
    text: question.text,
    image: question.image,
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

  console.log("form.values", form.values);

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
    if (type === "edit") navigate("/profile/my-quizzes");
  }, [id, navigate]);

  useEffect(() => {
    if (createSuccess || updateSuccess) handleFormReset();
  }, [createSuccess, updateSuccess, handleFormReset]);

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
    <form onSubmit={handleFormSubmit} className={styles.createQuizForm}>
      <Grid gutter={"md"} align="end">
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
        <Grid.Col span={7} className={styles.row}>
          <Grid gutter={"md"} align="center">
            <Grid.Col span={12}>
              <TextInput
                label="Title"
                required
                placeholder="Title"
                {...form.getInputProps("title")}
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <TextInput
                label="Description"
                required
                placeholder="Description"
                {...form.getInputProps("description")}
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <MultiSelect
                label="Genres"
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
          </Grid>
        </Grid.Col>
        <Grid.Col span={5}>
          <PictureInput
            inputHeight={230}
            onPictureChange={(picture) => form.setFieldValue("image", picture)}
            activePicture={form.getInputProps("image").value}
          />
        </Grid.Col>
        {form.values.questions.map((question, index) => (
          <React.Fragment key={`question_${index}_header`}>
            <Grid.Col span={12}>
              <div className={styles.questionHeader}>
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
                <h2 className={styles.questionHeaderText}>
                  Question {index + 1}
                </h2>
              </div>
            </Grid.Col>
            <Grid.Col span={8}>
              <Grid>
                <Grid.Col span={12} key={`question_${index}_text_input`}>
                  <TextInput
                    label="Question"
                    required
                    placeholder={`Example question ${index + 1}`}
                    value={question.text}
                    onChange={(event) =>
                      form.setFieldValue(
                        `questions.${index}.text`,
                        event.currentTarget.value
                      )
                    }
                  />
                </Grid.Col>
                <Grid.Col span={12} key={`question_${index}_type_input`}>
                  <Select
                    label="Type"
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
              </Grid>
            </Grid.Col>
            <Grid.Col span={4}>
              <PictureInput
                inputHeight={200}
                onPictureChange={(picture) =>
                  form.setFieldValue(`questions.${index}.image`, picture)
                }
              />
            </Grid.Col>
            {question.options.map((option, optionIndex) => (
              <React.Fragment key={`question_${index}_option_${optionIndex}`}>
                <Grid.Col
                  span={"content"}
                  key={`question_${index}_option_${optionIndex}`}
                  className={styles.optionFlex}
                >
                  <Button
                    color="red"
                    size="xs"
                    mb={1}
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
                </Grid.Col>
                <Grid.Col span={10}>
                  <TextInput
                    label={`Option ${optionIndex + 1}`}
                    required
                    placeholder={`Example answer for question ${index + 1}`}
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
                  span={1}
                  key={`question_${index}_option_${optionIndex}_correct_input`}
                >
                  <Checkbox
                    label="Correct"
                    mb={8}
                    placeholder="Correct"
                    checked={option.isCorrect}
                    onChange={(e) =>
                      form.setFieldValue(
                        `questions.${index}.options.${optionIndex}.isCorrect`,
                        e.target.checked
                      )
                    }
                  />
                </Grid.Col>
              </React.Fragment>
            ))}
            <Grid.Col span={12} pb={50}>
              <Button
                style={{ fontSize: "0.875em" }}
                onClick={() => handleAddOption(index)}
                fullWidth
              >
                <i
                  className="pi pi-plus"
                  style={{ fontSize: "1em", marginRight: "5px" }}
                />
                Add option
              </Button>
            </Grid.Col>
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
      <div className={styles.createQuizButtonContainer}>
        <Flex justify="end" gap={20} mt={20} mb={50}>
          <Button color="red" onClick={handleFormReset}>
            {type === "edit" ? "Cancel" : "Discard"}
          </Button>
          <Button type="submit" color="yellow">
            {type === "edit" ? "Update" : "Create"}
          </Button>
        </Flex>
      </div>
    </form>
  );
};

export default CreateQuiz;
