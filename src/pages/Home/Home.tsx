import { Image } from '@mantine/core';
import styles from './Home.module.scss';
import { useEffect } from 'react';
import { notifications } from '@mantine/notifications';
import { useTranslation } from 'react-i18next';

interface HomeProps {
    startNotification?: () => void;
}

const Home = (props: HomeProps) => {

    const { t } = useTranslation('app');
    const { startNotification } = props;

    useEffect(() => {
        notifications.clean();
        if (startNotification) {
            startNotification();
        }
    }, [startNotification]);

    return (
        <div className={styles.hero}>
            <Image src='/logo-no-background.svg' alt='Quizz World' className={styles.logoMainPage}/>
            <div className={styles.topicBox} onClick={() => window.location.href = '/quizz-list/tv-shows'}>
                <h2 className={styles.topicTitle}>{t("tvShows")}</h2>
            </div>
            <div className={styles.topicBoxTwo} onClick={() => window.location.href = '/quizz-list/music'}>
                <h2 className={styles.topicTitle}>{t("music")}</h2>
            </div>
            <div className={styles.topicBoxThree} onClick={() => window.location.href = '/quizz-list/movies'}>
                <h2 className={styles.topicTitle}>{t("movies")}</h2>
            </div>
            <div className={styles.topicBoxFour} onClick={() => window.location.href = '/quizz-list/games'}>
                <h2 className={styles.topicTitle}>{t("games")}</h2>
            </div>
            <div className={styles.topicBoxFive} onClick={() => window.location.href = '/quizz-list/other'}>
                <h2 className={styles.topicTitle}>{t("more")}</h2>
            </div>
        </div>
    );
}

export default Home;