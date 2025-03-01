import { QuizzListElementProps } from "../quizzes.types";
import styles from "../QuizzList.module.scss";
import { Button, Grid, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { returnImage } from "../../../shared/images/ImageReader";
import useLikeQuizMutation from "./useLikeQuizMutation";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { showSuccessNotification } from "../../../shared/notifications/showSuccessNotification";

export const getShortenedNumberData = (number: number) => {
  if (number >= 1000000) {
    return `${(number / 1000000).toFixed(1)}M`;
  }
  if (number >= 1000) {
    return `${(number / 1000).toFixed(1)}K`;
  }
  return number;
};

const QuizzListElement = (props: QuizzListElementProps) => {
  const { mutate: like } = useLikeQuizMutation(["quizzList"]);

  const [opened, { open, close }] = useDisclosure(false);
  const {
    id,
    title,
    description,
    color,
    finishCount,
    likeCount,
    image,
    Author,
    liked,
    createdAt,
  } = props;

  const userAvatar = returnImage(Author.image);
  const quizzImage = returnImage(image);
  const navigate = useNavigate();
  const [timeMode, setTimeMode] = useState<boolean | undefined>();
  const [timeLimit, setTimeLimit] = useState<number | undefined>();

  useEffect(() => {
    setTimeMode(undefined);
    setTimeLimit(undefined);
  }, [opened]);

  return (
    <>
      <div
        className={styles.quizzListElement}
        style={
          quizzImage ? { backgroundImage: quizzImage } : { background: color }
        }
        onClick={open}
      >
        <h2 className={styles.quizzListElementTitle}>{title}</h2>
        {/* <p className={styles.quizzListElementDescription}>{description}</p> */}
        <div className={styles.quizzListElementAuthorSection}>
          {userAvatar ? (
            <img
              src={userAvatar}
              alt="Author"
              className={styles.quizzListElementAuthorAvatar}
              style={{ padding: 0 }}
            />
          ) : (
            <i
              className={`pi pi-user ${styles.quizzListElementAuthorAvatar}`}
            ></i>
          )}
          <p className={styles.quizzListElementAuthorName}>{Author.username}</p>
        </div>
        <div className={styles.quizzListElementInfoSection}>
          <div className={styles.quizzListElementInfo}>
            <i
              className={`pi pi-check ${styles.quizzListElementInfoIcon}`}
              style={{ color: "lightgreen" }}
            ></i>
            <p className={styles.quizzListElementInfoData}>
              {getShortenedNumberData(finishCount)}
            </p>
          </div>
          <div className={styles.quizzListElementInfo}>
            <i
              className={`pi ${liked ? "pi-star-fill" : "pi-star"}  ${
                styles.quizzListElementInfoIcon
              }`}
              style={{ color: "gold" }}
            ></i>
            <p className={styles.quizzListElementInfoData}>
              {getShortenedNumberData(likeCount)}
            </p>
          </div>
        </div>
      </div>
      <Modal
        opened={opened}
        onClose={close}
        classNames={{
          body: styles.quizzListElementModalBody,
          content: styles.quizzListElementModalContent,
        }}
        size="xl"
        styles={{
          content: {
            background: color,
          },
        }}
        withCloseButton={false}
      >
        <h1 className={styles.modalTitle}>{title}</h1>
        <div className={styles.modalContent}>
          <div className={styles.modalDescriptionContainer}>
            <p className={styles.modalDescription}>{description}</p>
          </div>
          <div className={styles.modalStatisticsSection}>
            <p className={styles.modalStatistics}>
              <i
                className={`pi pi-check ${styles.quizzListElementInfoIcon}`}
                style={{ color: "lightgreen" }}
              ></i>
              Quizz finished by {getShortenedNumberData(finishCount)} users
            </p>
            <p className={styles.modalStatistics}>
              <i
                className={`pi ${liked ? "pi-star-fill" : "pi-star"} ${
                  styles.quizzListElementInfoIcon
                }`}
                style={{ color: "gold" }}
              ></i>
              Quizz liked by {getShortenedNumberData(likeCount)} users
            </p>
            <p className={styles.modalStatistics}>
              {userAvatar ? (
                <img
                  src={userAvatar}
                  alt="Author"
                  className={styles.quizzListElementInfoIcon}
                  style={{ padding: 0, borderRadius: "50%" }}
                />
              ) : (
                <i
                  className={`pi pi-user ${styles.quizzListElementInfoIcon}`}
                ></i>
              )}
              Quizz created by {Author.username}
            </p>
          </div>
        </div>
        <div className={styles.modalButtonSection}>
          <Button
            size="lg"
            color="transparent"
            classNames={{
              root: `${styles.quizzTypeChooseRoot} ${
                timeMode ? styles.active : ""
              }`,
              label: styles.quizzTypeChooseLabel,
            }}
            onClick={() => setTimeMode(true)}
          >
            <i className={`pi pi-stopwatch ${styles.quizzTypeChooseIcon}`}></i>
            <h4 className={styles.quizzTypeChooseText}>Time limit</h4>
          </Button>
          <Button
            size="lg"
            color="transparent"
            classNames={{
              root: `${styles.quizzTypeChooseRoot} ${
                timeMode === false ? styles.active : ""
              }`,
              label: styles.quizzTypeChooseLabel,
            }}
            onClick={() => setTimeMode(false)}
          >
            <i
              className={`pi pi-times-circle ${styles.quizzTypeChooseIcon}`}
            ></i>
            <h4 className={styles.quizzTypeChooseText}>No time limit</h4>
          </Button>
        </div>
        {timeMode && (
          <div className={styles.modalTimeLimitSection}>
            <Grid gutter={"xs"} grow>
              <Grid.Col span={1.5}>
                <Button
                  size="lg"
                  color="transparent"
                  classNames={{
                    root: `${styles.quizzTimeChooseRoot} ${
                      timeLimit === 10 ? styles.active : ""
                    }`,
                  }}
                  onClick={() => setTimeLimit(10)}
                >
                  10s
                </Button>
              </Grid.Col>
              <Grid.Col span={1.5}>
                <Button
                  size="lg"
                  color="transparent"
                  classNames={{
                    root: `${styles.quizzTimeChooseRoot} ${
                      timeLimit === 30 ? styles.active : ""
                    }`,
                  }}
                  onClick={() => setTimeLimit(30)}
                >
                  30s
                </Button>
              </Grid.Col>
              <Grid.Col span={1.5}>
                <Button
                  size="lg"
                  color="transparent"
                  classNames={{
                    root: `${styles.quizzTimeChooseRoot} ${
                      timeLimit === 60 ? styles.active : ""
                    }`,
                  }}
                  onClick={() => setTimeLimit(60)}
                >
                  1m
                </Button>
              </Grid.Col>
              <Grid.Col span={1.5}>
                <Button
                  size="lg"
                  color="transparent"
                  classNames={{
                    root: `${styles.quizzTimeChooseRoot} ${
                      timeLimit === 120 ? styles.active : ""
                    }`,
                  }}
                  onClick={() => setTimeLimit(120)}
                >
                  3m
                </Button>
              </Grid.Col>
              <Grid.Col span={1.5}>
                <Button
                  size="lg"
                  color="transparent"
                  classNames={{
                    root: `${styles.quizzTimeChooseRoot} ${
                      timeLimit === 300 ? styles.active : ""
                    }`,
                  }}
                  onClick={() => setTimeLimit(300)}
                >
                  5m
                </Button>
              </Grid.Col>
              <Grid.Col span={1.5}>
                <Button
                  size="lg"
                  color="transparent"
                  classNames={{
                    root: `${styles.quizzTimeChooseRoot} ${
                      timeLimit === 600 ? styles.active : ""
                    }`,
                  }}
                  onClick={() => setTimeLimit(600)}
                >
                  10m
                </Button>
              </Grid.Col>
              <Grid.Col span={1.5}>
                <Button
                  size="lg"
                  color="transparent"
                  classNames={{
                    root: `${styles.quizzTimeChooseRoot} ${
                      timeLimit === 900 ? styles.active : ""
                    }`,
                  }}
                  onClick={() => setTimeLimit(900)}
                >
                  15m
                </Button>
              </Grid.Col>
              <Grid.Col span={1.5}>
                <Button
                  size="lg"
                  color="transparent"
                  classNames={{
                    root: `${styles.quizzTimeChooseRoot} ${
                      timeLimit === 1800 ? styles.active : ""
                    }`,
                  }}
                  onClick={() => setTimeLimit(1800)}
                >
                  30m
                </Button>
              </Grid.Col>
            </Grid>
            {/* <NumberInput
              unstyled
              allowDecimal={false}
              allowLeadingZeros={false}
              allowNegative={false}
              max={3600} // 1 hour
              suffix="s"
              value={timeLimit}
              onChange={(value) => setTimeLimit(+value)}
              classNames={{
                input: styles.modalNumberInput,
                wrapper: styles.modalNumberInputWrapper,
                label: styles.modalNumberInputLabel,
                root: styles.modalNumberInputRoot,
              }}
              onFocus={(e) => e.target.classList.add(styles.active)}
              onBlur={(e) => e.target.classList.remove(styles.active)}
            /> */}
          </div>
        )}
        {timeMode !== undefined && (
          <div className={styles.playButton}>
            <Button
              color="yellow"
              fullWidth
              className={styles.modalButton}
              onClick={() => navigate(`/quizz/${id}?timeLimit=${timeLimit}`)}
            >
              Play
            </Button>
          </div>
        )}
        <div className={styles.modalAdditionalOperations}>
          <i
            className={`pi pi-flag ${styles.modalAdditionalOperationsIcon}`}
          ></i>
          <i
            className={`pi pi-info-circle ${styles.modalAdditionalOperationsIcon}`}
          ></i>
          <i
            className={`pi pi-share-alt ${styles.modalAdditionalOperationsIcon}`}
            style={{ color: "lightblue" }}
            onClick={() => {
              navigator.clipboard.writeText(
                `${window.location.origin}/quizz/${id}${
                  timeMode && timeLimit ? `?timeLimit=${timeLimit}` : ""
                }`
              );
              showSuccessNotification("Link to the quizz copied to clipboard");
            }}
          ></i>
          <i
            className={`pi ${liked ? "pi-star-fill" : "pi-star"} ${
              styles.modalAdditionalOperationsIcon
            }`}
            style={{ color: "gold" }}
            onClick={() => like(id)}
          ></i>
        </div>
        <div className={styles.modalReturnButton}>
          <i
            className={`pi pi-arrow-left ${styles.modalAdditionalOperationsIcon}`}
            onClick={close}
          ></i>
        </div>
      </Modal>
    </>
  );
};

export default QuizzListElement;
