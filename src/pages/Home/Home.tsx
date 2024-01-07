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
            <div className={styles.topicBox}>
                <h2 className={styles.topicTitle}>{t("tvShows")}</h2>
            </div>
            <div className={styles.topicBoxTwo}>
                <h2 className={styles.topicTitle}>{t("music")}</h2>
            </div>
            <div className={styles.topicBoxThree}>
                <h2 className={styles.topicTitle}>{t("movies")}</h2>
            </div>
            <div className={styles.topicBoxFour}>
                <h2 className={styles.topicTitle}>{t("games")}</h2>
            </div>
            <div className={styles.topicBoxFive}>
                <h2 className={styles.topicTitle}>{t("more")}</h2>
            </div>
        </div>
    );
}

export default Home;