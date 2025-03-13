import { EQuestionTypes, OptionProps, QuestionProps } from "../quizz.types";
import RadioOption from "./RadioOption";
import CheckboxOption from "./CheckboxOption";
import styles from "../Quizz.module.scss";
import {
  Checkbox,
  Grid,
  Group,
  Progress,
  Radio,
  Text,
  TextInput,
} from "@mantine/core";
import { useEffect, useState } from "react";
import questionMark from "../../../shared/images/Quizz/questionMark.png";
import { useMediaQuery } from "react-responsive";

const Question = (props: QuestionProps) => {
  const {
    id,
    text,
    type,
    Options,
    active,
    returnAnswer,
    viewMode,
    answers,
    correctAnswers,
    isCorrect,
    notAnswered,
    image,
    timeLimit,
    setNoTimeLeft,
  } = props;
  const [value, setValue] = useState<string>("0");
  const [values, setValues] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState<number>(timeLimit || 0);
  const isLg = useMediaQuery({ query: "(min-width: 1100px)" });
  const isXs = useMediaQuery({ query: "(max-width: 490px)" });

  useEffect(() => {
    if (timeLimit && active && !viewMode) {
      const interval = setInterval(() => {
        if (timeLeft > 0) {
          setTimeLeft(timeLeft - 1);
        } else {
          setNoTimeLeft && setNoTimeLeft();
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timeLeft, timeLimit, active]);

  const returnImage = () => {
    if (image) {
      const base64 = btoa(
        new Uint8Array(image.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );
      return `data:image/png;base64,${base64}`;
    }
    return null;
  };

  const quizzImage = returnImage();

  const determineOptionType = (optionProps: OptionProps) => {
    switch (type) {
      case EQuestionTypes.SingleChoice:
        return <RadioOption {...optionProps} disabled={viewMode} />;
      case EQuestionTypes.MultipleChoice:
        return <CheckboxOption {...optionProps} disabled={viewMode} />;
      default:
        return <TextInput />;
    }
  };

  useEffect(() => {
    handleSubmit();
  }, [value, values]);

  const handleSubmit = () => {
    if (parseInt(value) === 0 && values.length === 0) return;
    returnAnswer(
      id,
      parseInt(value) || null,
      values.map((v) => (parseInt(v) === 0 ? 0 : parseInt(v))) || null
    );
  };

  return (
    <div className={`${styles.question} ${active ? styles.active : ""}`}>
      <h3 className={styles.questionTitle}>{text}</h3>

      <Radio.Group value={value} onChange={setValue} style={{ width: "100%" }}>
        <Checkbox.Group
          value={values}
          onChange={setValues}
          style={{ width: "100%" }}
        >
          <Grid classNames={{ col: styles.answerContainer }}>
            <Grid.Col span={12}>
              {quizzImage ? (
                <img
                  src={quizzImage}
                  alt="quizz_image"
                  className={styles.quizzImage}
                />
              ) : (
                <>
                  {isLg && (
                    <img
                      src={questionMark}
                      alt="quizz_image"
                      className={styles.quizzImage}
                      style={{ transform: "scale(0.55) rotate(-20deg)" }}
                    />
                  )}
                  {!isXs && (
                    <img
                      src={questionMark}
                      alt="quizz_image"
                      className={styles.quizzImage}
                      style={{ transform: "scale(0.75) rotate(-10deg)" }}
                    />
                  )}
                  <img
                    src={questionMark}
                    alt="quizz_image"
                    className={styles.quizzImage}
                    style={{ transform: "scale(1) rotate(0deg)" }}
                  />
                  {!isXs && (
                    <img
                      src={questionMark}
                      alt="quizz_image"
                      className={styles.quizzImage}
                      style={{ transform: "scale(0.75) rotate(10deg)" }}
                    />
                  )}
                  {isLg && (
                    <img
                      src={questionMark}
                      alt="quizz_image"
                      className={styles.quizzImage}
                      style={{ transform: "scale(0.55) rotate(20deg)" }}
                    />
                  )}
                </>
              )}
            </Grid.Col>
            <Grid.Col span={12}>
              <Text
                classNames={{
                  root: `${styles.answersDescription} ${
                    isCorrect && viewMode ? styles.correct : ""
                  } ${
                    isCorrect !== undefined && !isCorrect && viewMode
                      ? styles.incorrect
                      : ""
                  }`,
                }}
              >
                {viewMode
                  ? notAnswered
                    ? "Not answered!"
                    : isCorrect
                    ? "Correct!"
                    : "Incorrect!"
                  : type === EQuestionTypes.SingleChoice
                  ? "Choose one answer"
                  : "Choose all the correct answers"}
              </Text>
            </Grid.Col>
            {timeLimit && active ? (
              <Grid.Col span={12}>
                <Progress.Root
                  display={viewMode ? "none" : "block"}
                  size={30}
                  style={{ margin: "10px" }}
                >
                  <Progress.Section
                    value={(timeLeft / timeLimit) * 100}
                    color={"yellow"}
                    animated
                  >
                    <Progress.Label>{timeLeft}s</Progress.Label>
                  </Progress.Section>
                </Progress.Root>
              </Grid.Col>
            ) : null}
            {Options.sort((a, b) => a.order - b.order).map((option) => {
              if (viewMode && answers && correctAnswers) {
                if (type === EQuestionTypes.SingleChoice)
                  if (+option.id === answers.answerId)
                    option.isCorrect = +option.id === correctAnswers.answerId;
                  else if (+option.id === correctAnswers.answerId)
                    option.correctNotChoosen = true;
                  else option.isCorrect = undefined;
                else if (answers.answerIds?.includes(+option.id))
                  option.isCorrect = correctAnswers.answerIds?.includes(
                    +option.id
                  );
                else if (correctAnswers.answerIds?.includes(+option.id))
                  option.correctNotChoosen = true;
                else option.isCorrect = undefined;
              }
              if (viewMode && correctAnswers && !answers) {
                if (type === EQuestionTypes.SingleChoice)
                  if (+option.id === correctAnswers.answerId)
                    option.correctNotChoosen = true;
                  else option.isCorrect = undefined;
                else if (correctAnswers.answerIds?.includes(+option.id))
                  option.correctNotChoosen = true;
                else option.isCorrect = undefined;
              }
              return (
                <Grid.Col
                  key={`${text}_${option.id}`}
                  span={{ base: 12, xs: 12, sm: 6, lg: 6, xl: 4 }}
                >
                  {determineOptionType(option)}
                </Grid.Col>
              );
            })}
          </Grid>
        </Checkbox.Group>
      </Radio.Group>
    </div>
  );
};

export default Question;
