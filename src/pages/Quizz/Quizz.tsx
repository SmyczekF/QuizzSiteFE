import { useMutation, useQuery } from "@tanstack/react-query";
import styles from "./Quizz.module.scss";
import { Answers, EQuestionTypes, QuizzProps } from "./quizz.types";
import axios, { AxiosResponse } from "axios";
import { useParams } from "react-router-dom";
import Question from "./components/Question";
import { Button } from "@mantine/core";
import { useEffect, useState } from "react";
import { showSuccessNotification } from "../../shared/notifications/showSuccessNotification";
import { showErrorNotification } from "../../shared/notifications/showErrorNotification";
import QuizFinish from "./components/QuizFinish/QuizFinish";
import ReplayButton from "./components/ReplayButton";
import QuizzNavigation from "./components/QuizzNavigation/QuizzNavigation";

const Quizz = (props: QuizzProps) => {
  const { id, timeLimit, Author, Questions } = props;

  const [shownQuestion, setShownQuestion] = useState<number>(0);
  const [answers, setAnswers] = useState<Answers[]>([]);
  const [finishData, setFinishData] = useState<{
    correctAnswers: Answers[];
    score: number;
  } | null>(null);
  const [finishedQuizz, setFinishedQuizz] = useState<boolean>(false);
  const [blockedQuestions, setBlockedQuestions] = useState<number[]>([
    -1,
    Questions.length,
  ]);

  const returnAvatar = () => {
    if (Author.image) {
      const base64 = btoa(
        new Uint8Array(Author.image.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );
      return `data:image/png;base64,${base64}`;
    }
    return null;
  };

  useEffect(() => {
    if (finishedQuizz) setBlockedQuestions([-1, Questions.length]);
  }, [Questions.length, finishedQuizz]);

  const handleAnswerReturn = (
    questionId: number,
    answerId: number | null,
    answerIds: number[] | null
  ) => {
    const newAnswers = [...answers];
    const questionIndex = newAnswers.findIndex(
      (a) => a.questionId === questionId
    );
    if (questionIndex === -1) {
      newAnswers.push({
        questionId,
        answerId,
        answerIds,
      });
    } else {
      newAnswers[questionIndex] = {
        questionId,
        answerId,
        answerIds,
      };
    }
    setAnswers(newAnswers);
  };

  const finishMutation = useMutation<AxiosResponse>({
    mutationFn: () => axios.post(`/quizz/finish/${id}`, { answers, timeLimit }),
    onSuccess: (data: AxiosResponse) => {
      showSuccessNotification("Quizz finished successfully");
      setFinishData(data.data);
      setFinishedQuizz(true);
      setShownQuestion(Questions.length);
    },
    onError: () => {
      showErrorNotification("Quizz finished unsuccessfully");
    },
  });

  const handleSetShownQuestion = (to: number) => {
    if (blockedQuestions.includes(to)) return null;
    if (to === -1) window.location.reload();
    if (to === Questions.length) finishMutation.mutate();
    else setShownQuestion(to);
  };

  const checkIfBackNotBlockedQuestion = (to: number): boolean => {
    if (blockedQuestions.includes(to)) {
      if (to - 1 >= 0) {
        return checkIfBackNotBlockedQuestion(to - 1);
      } else {
        return false;
      }
    } else {
      return true;
    }
  };

  const checkIfNextNotBlockedQuestion = (to: number): boolean => {
    if (blockedQuestions.includes(to)) {
      if (to + 1 < Questions.length) {
        return checkIfNextNotBlockedQuestion(to + 1);
      } else {
        return false;
      }
    } else {
      return true;
    }
  };

  const setNextNotBlockedQuestion = (to: number) => {
    if (blockedQuestions.includes(to)) {
      if (to + 1 < Questions.length) {
        setNextNotBlockedQuestion(to + 1);
      } else {
        setShownQuestion(to + 1);
      }
    } else {
      handleSetShownQuestion(to);
    }
  };

  const setBackNotBlockedQuestion = (to: number) => {
    if (blockedQuestions.includes(to)) {
      if (to - 1 >= 0) {
        setBackNotBlockedQuestion(to - 1);
      }
    } else {
      handleSetShownQuestion(to);
    }
  };

  return (
    <div className={styles.view}>
      <div className={`${styles.quizzSection} ${styles.active}`}>
        {shownQuestion < Questions.length ? (
          Questions.sort((a, b) => a.order - b.order).map((question, index) => {
            return (
              <Question
                {...question}
                key={`${question.text}_${question.id}`}
                active={shownQuestion === index}
                returnAnswer={handleAnswerReturn}
                viewMode={finishedQuizz}
                answers={answers.find((a) => a.questionId === question.id)}
                correctAnswers={finishData?.correctAnswers.find(
                  (a) => a.questionId === question.id
                )}
                timeLimit={timeLimit}
                setNoTimeLeft={() => {
                  setBlockedQuestions([...blockedQuestions, index]);
                  checkIfNextNotBlockedQuestion(shownQuestion + 1)
                    ? setNextNotBlockedQuestion(shownQuestion + 1)
                    : checkIfBackNotBlockedQuestion(shownQuestion - 1)
                    ? setBackNotBlockedQuestion(shownQuestion - 1)
                    : finishMutation.mutate();
                }}
                isCorrect={
                  question.type === EQuestionTypes.SingleChoice
                    ? finishData?.correctAnswers.find(
                        (a) => a.questionId === question.id
                      )?.answerId ===
                      answers.find((a) => a.questionId === question.id)
                        ?.answerId
                    : finishData?.correctAnswers
                        .find((a) => a.questionId === question.id)
                        ?.answerIds?.sort()
                        .join("") ===
                      answers
                        .find((a) => a.questionId === question.id)
                        ?.answerIds?.sort()
                        .join("")
                }
                notAnswered={
                  answers.find((a) => a.questionId === question.id) ===
                  undefined
                }
              />
            );
          })
        ) : finishData ? (
          <QuizFinish score={finishData.score} />
        ) : null}
        <div className={styles.quizzSectionButtons}>
          <Button
            size="lg"
            color="transparent"
            classNames={{
              root: `${styles.quizzSectionButtonRoot} ${
                checkIfBackNotBlockedQuestion(shownQuestion - 1)
                  ? ""
                  : styles.disabled
              }`,
              label: styles.quizzSectionButtonLabel,
            }}
            onClick={() =>
              checkIfBackNotBlockedQuestion(shownQuestion - 1)
                ? setBackNotBlockedQuestion(shownQuestion - 1)
                : null
            }
          >
            <i
              className={`pi pi-arrow-left ${styles.quizzSectionButtonIcon}`}
            ></i>
            <h4 className={styles.quizzSectionButtonText}>Back</h4>
          </Button>
          <QuizzNavigation
            activePage={shownQuestion + 1}
            setPage={handleSetShownQuestion}
            pages={Questions.map((question, index) => {
              return {
                pageNumber: question.order,
                isCorrect:
                  question.type === EQuestionTypes.SingleChoice
                    ? finishData?.correctAnswers.find(
                        (a) => a.questionId === question.id
                      )?.answerId ===
                      answers.find((a) => a.questionId === question.id)
                        ?.answerId
                    : finishData?.correctAnswers
                        .find((a) => a.questionId === question.id)
                        ?.answerIds?.sort()
                        .join("") ===
                      answers
                        .find((a) => a.questionId === question.id)
                        ?.answerIds?.sort()
                        .join(""),
                isFilled:
                  answers.find((a) => a.questionId === question.id) !==
                  undefined,
              };
            })}
            blockedQuestions={blockedQuestions}
            isFinished={finishedQuizz}
          />
          {checkIfNextNotBlockedQuestion(shownQuestion + 1) &&
          shownQuestion < Questions.length ? (
            <Button
              size="lg"
              color="transparent"
              classNames={{
                root: `${styles.quizzSectionButtonRoot} ${
                  checkIfNextNotBlockedQuestion(shownQuestion + 1)
                    ? ""
                    : styles.disabled
                }`,
                label: styles.quizzSectionButtonLabel,
              }}
              onClick={() =>
                checkIfNextNotBlockedQuestion(shownQuestion + 1)
                  ? setNextNotBlockedQuestion(shownQuestion + 1)
                  : null
              }
            >
              <h4 className={styles.quizzSectionButtonText}>Next</h4>
              <i
                className={`pi pi-arrow-right ${styles.quizzSectionButtonIcon}`}
              ></i>
            </Button>
          ) : shownQuestion === Questions.length ? (
            <ReplayButton onClick={() => window.location.reload()} />
          ) : (
            <Button
              size="lg"
              color="transparent"
              classNames={{
                root: styles.quizzSectionButtonRoot,
                label: styles.quizzSectionButtonLabel,
              }}
              onClick={() => {
                finishedQuizz
                  ? setShownQuestion(shownQuestion + 1)
                  : finishMutation.mutate();
              }}
            >
              <h4 className={styles.quizzSectionButtonText}>Finish</h4>
              <i
                className={`pi pi-arrow-right ${styles.quizzSectionButtonIcon}`}
              ></i>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

const QuizzProvider = () => {
  const { id } = useParams();

  const { data } = useQuery<QuizzProps>({
    queryKey: ["quizz"],
    queryFn: () => axios.get(`/quizz/get/${id}`).then((res) => res.data),
  });

  console.log(data);

  //TODO ADD LOADING SCREEN
  return <>{data ? <Quizz {...data} /> : null}</>;
};

export default QuizzProvider;
