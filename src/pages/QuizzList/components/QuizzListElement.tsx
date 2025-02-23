import { QuizzListElementProps } from "../quizzes.types";
import styles from "../QuizzList.module.scss";
import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { returnImage } from "../../../shared/images/ImageReader";

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
    createdAt,
  } = props;

  const userAvatar = returnImage(Author.image);
  const quizzImage = returnImage(image);

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
              className={`pi pi-star ${styles.quizzListElementInfoIcon}`}
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
                className={`pi pi-star ${styles.quizzListElementInfoIcon}`}
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
            color="yellow"
            fullWidth
            className={styles.modalButton}
            onClick={() => (window.location.href = `/quizz/${id}`)}
          >
            Play
          </Button>
        </div>
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
          ></i>
          <i
            className={`pi pi-star ${styles.modalAdditionalOperationsIcon}`}
            style={{ color: "gold" }}
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
