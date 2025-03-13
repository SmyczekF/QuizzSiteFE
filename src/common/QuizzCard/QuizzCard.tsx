import { useEffect, useRef, useState } from "react";
import styles from "./QuizzCard.module.scss";
import React from "react";

interface QuizzInfo {
  title: string;
  imageUrl: string;
  topResult: string;
  popularity: number;
  date: Date;
  category: string;
  tags: string[];
}

const QuizzCard = ({ quizzInfo }: { quizzInfo: QuizzInfo }) => {
  const itemRef = useRef<HTMLDivElement>(null); // Określenie typu referencji
  const [className, setClassName] = useState("");

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

  return (
    <>
      <div
        className={`${styles.quizz} ${className}`}
        ref={itemRef}
        style={{
          backgroundImage: `linear-gradient(to bottom, transparent, rgba(0, 0, 0, 1)), url(${quizzInfo.imageUrl})`,
        }}
      >
        <div className={styles.textContainer}>
          <div className={styles.info}>
            <div className={styles.text}>
              <i className="pi pi-users"></i>
              {quizzInfo.popularity}
            </div>
            <div className={styles.text}>
              <i className="pi pi-check-square"></i>
              {quizzInfo.topResult}
            </div>
            <div className={styles.text}>
              <i className="pi pi-calendar"></i>
              {quizzInfo.date.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
            <div className={styles.likes}>
              <div className={styles.text}>
                <i className="pi pi-thumbs-up"></i>
                10
              </div>
              <div className={styles.text}>
                <i className="pi pi-thumbs-down"></i>1
              </div>
            </div>

            <div className={styles.moreInfo}>
              <div className={`${styles.text}  ${styles.category}`}>
                Kategoria: Anime
              </div>
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
