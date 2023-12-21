import { Image } from '@mantine/core';
import styles from './Home.module.scss';

const Home = () => {
    return (
        <div className={styles.hero}>
            <Image src='/logo-no-background.svg' alt='Quizz World' className={styles.logoMainPage}/>
            <div className={styles.topicBox}>
                <h2 className={styles.topicTitle}>Tv Shows</h2>
            </div>
            <div className={styles.topicBoxTwo}>
                <h2 className={styles.topicTitle}>Trivia</h2>
            </div>
            <div className={styles.topicBoxThree}>
                <h2 className={styles.topicTitle}>Movies</h2>
            </div>
            <div className={styles.topicBoxFour}>
                <h2 className={styles.topicTitle}>Games</h2>
            </div>
            <div className={styles.topicBoxFive}>
                <h2 className={styles.topicTitle}>More</h2>
            </div>
        </div>
    );
}

export default Home;