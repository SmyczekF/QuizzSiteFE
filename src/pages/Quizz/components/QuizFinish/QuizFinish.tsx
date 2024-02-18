import { QuizFinishProps } from "../../quizz.types"
import styles from './QuizFinish.module.scss';
import { useEffect, useState } from "react";
import { PieChart } from '@mantine/charts';

const QuizFinish = (props: QuizFinishProps) => {

    const { score } = props;
    const [scoreLoaderValue, setScoreLoaderValue] = useState<number>(0);


    const determineFillingSpeed = () => {
        if(scoreLoaderValue < 10) return 90;
        if(scoreLoaderValue < 20) return 70;
        if(scoreLoaderValue < 30) return 50;
        return 30;
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if(scoreLoaderValue < score) {
                setScoreLoaderValue(scoreLoaderValue + 1);
            }
        }, determineFillingSpeed());
        return () => clearInterval(interval);
    }, [scoreLoaderValue, score])

    return (
        <div>
            <h2 className={styles.title}>Quizz Finished!</h2>
            <h3 className={styles.quizzDescription}>Score</h3>
            <div className={styles.pieChartWrapper}>
                <PieChart
                    data={[
                        { value: scoreLoaderValue, color: 'green.5', name: 'Score' },
                        { value: 100 - scoreLoaderValue, color: 'red.4', name: 'Empty' },
                    ]}
                    strokeWidth={0}
                    style={{height: '250px'}}
                    size={250}
                />
                <h3 className={`${styles.quizzDescriptionPercentage} ${score <= scoreLoaderValue ? styles.animate : ''}`}>{scoreLoaderValue}%</h3>
            </div>
            {
                scoreLoaderValue >= score
                    ? scoreLoaderValue < 30 
                        ? <h3 className={styles.quizzFinalResult}>Your effort in the knowledge quiz is appreciated! Scoring {scoreLoaderValue}% happens to everyone. Keep learning and try the quiz again when you're ready.</h3> 
                    : scoreLoaderValue < 50
                        ? <h3 className={styles.quizzFinalResult}>Your score is below average. It's okay, you can always try again and improve your score. Keep learning and try the quiz again when you're ready.</h3>
                    : scoreLoaderValue < 70
                        ? <h3 className={styles.quizzFinalResult}>Your score is above average. You have great knowledge about this topic!</h3>
                    : scoreLoaderValue < 90
                        ? <h3 className={styles.quizzFinalResult}>Your score is excellent. You have a deep knowledge about this topic!</h3>
                    : <h3 className={styles.quizzFinalResult}>Your score is perfect. You are an expert!</h3>
                : null
            }
        </div>
    )
}

export default QuizFinish