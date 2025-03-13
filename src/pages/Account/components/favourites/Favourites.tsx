import QuizzCard from "../../../../common/QuizzCard/QuizzCard";
import styles from "./Favourites.module.scss";
import { Container } from "@mantine/core";

//wiem że powinno być gdzieś wspólnie ale na razie jest w obu
interface QuizzInfo {
  title: string;
  imageUrl: string;
  topResult: string;
  popularity: number;
  date: Date;
  category: string;
  tags: string[];
}

const Favourites = () => {
  //TODO napisać normalne pobieranie tych danych
  const tagsTable: string[] = ["Kimetsu no Yaiba", "Demon Slayer", "Anime"];

  const quizzDataArray: QuizzInfo[] = [
    {
      title: "Demon Slayer",
      imageUrl: "/demon-slayer-dummy.png",
      topResult: "60.5%",
      popularity: 100,
      date: new Date("2025-12-20"),
      category: "Anime",
      tags: tagsTable,
    },
    {
      title: "Attack on Titan",
      imageUrl: "/demon-slayer-dummy.png",
      topResult: "50.5%",
      popularity: 100000,
      date: new Date("2025-12-20"),
      category: "Anime",
      tags: tagsTable,
    },
    {
      title: "My Hero Academia",
      imageUrl: "/demon-slayer-dummy.png",
      topResult: "100%",
      popularity: 100123,
      date: new Date("2025-12-20"),
      category: "Anime",
      tags: tagsTable,
    },
    {
      title: "My Hero Academia",
      imageUrl: "/demon-slayer-dummy.png",
      topResult: "100%",
      popularity: 100123,
      date: new Date("2025-12-20"),
      category: "Anime",
      tags: tagsTable,
    },
    {
      title: "My Hero Academia",
      imageUrl: "/demon-slayer-dummy.png",
      topResult: "100%",
      popularity: 100123,
      date: new Date("2025-12-20"),
      category: "Anime",
      tags: tagsTable,
    },
  ];

  return (
    <>
      {/* <div className={styles.container}>
        {quizzDataArray.map((quizz, index) => (
          <QuizzCard key={index} quizzInfo={quizz} />
        ))}
      </div> */}

      <div className={styles.container}>
        {quizzDataArray.map((quizz, index) => (
          <QuizzCard key={index} quizzInfo={quizz} />
        ))}
      </div>
    </>
  );
};

export default Favourites;
