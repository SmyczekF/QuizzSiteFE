import { useEffect, useRef, useState } from "react";
import styles from "./QuizzCard.module.scss";
import { QuizzListElementProps } from "../../pages/QuizzList/quizzes.types";
import { returnImage } from "../../shared/images/ImageReader";
import { useNavigate } from "react-router-dom";

const QuizzCard = ({ quizzInfo }: { quizzInfo: QuizzListElementProps }) => {
  const itemRef = useRef<HTMLDivElement>(null); // Określenie typu referencji
  const [className, setClassName] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (itemRef.current) {
        const newWidth = itemRef.current.offsetWidth;
        setClassName(newWidth < 700 ? styles.smallQuizz : styles.bigQuizz);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const image = returnImage(quizzInfo.image);

  return (
    <>
      <div
        className={`${styles.quizz} ${className}`}
        ref={itemRef}
        style={{
          backgroundImage: `linear-gradient(to bottom, transparent, rgba(0, 0, 0, 1)), url(${image})`,
        }}
        onClick={() => navigate(`/quizz/${quizzInfo.id}`)}
      >
        <div className={styles.textContainer}>
          <div className={styles.info}>
            <div className={styles.text}>
              <i className="pi pi-users"></i>
              {quizzInfo.finishCount}
            </div>
            <div className={styles.text}>
              <i className="pi pi-check-square"></i>
              {/* TODO: trzeba dodać najlepszy wynik, na razie nie ma takiego w bazie */}
              {/* {quizzInfo.topResult} */}
              90%
            </div>
            <div className={styles.text}>
              {/* Tutaj trochę nie wiem czy to ma być stworzenie / update / ostatnie zagranie? */}
              <i className="pi pi-calendar"></i>
              {new Date(quizzInfo.createdAt).toLocaleDateString()}
            </div>
            <div className={styles.likes}>
              <div className={styles.text}>
                <i className="pi pi-thumbs-up"></i>
                {quizzInfo.likeCount}
              </div>
            </div>

            <div className={styles.moreInfo}>
              <div className={`${styles.text}  ${styles.category}`}>
                Genres: {quizzInfo.Genres.map((genre) => genre.name).join(",")}
              </div>
              {/* TODO: Dodać tagi - na razie nie ma czegoś takiego - tylko gatunki */}
              <div className={`${styles.text} ${styles.tags}`}>
                Tagi: Example,Example,Example
              </div>
            </div>
          </div>
          <div className={styles.title}>{quizzInfo.title}</div>
        </div>
      </div>
    </>
  );
};

export default QuizzCard;
