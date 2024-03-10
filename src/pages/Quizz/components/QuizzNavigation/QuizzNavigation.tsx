import { QuizzNavigationProps } from "../../quizz.types";
import styles from './QuizzNavigation.module.scss';

const QuizzNavigation = (props: QuizzNavigationProps) => {

    const { activePage, setPage, pages, isFinished, blockedQuestions } = props;

    const determineIfCorrect = (pageNumber: number) => {
        const page = pages[pageNumber];
        if(!isFinished && !page.isFilled) return styles.notFilled;
        if(!isFinished && page.isFilled) return styles.filled;
        if(page.isCorrect === false && page.isFilled) return styles.incorrect;
        if(page.isCorrect) return styles.correct;
        if(!page.isFilled) return styles.notFilled;
    }

    return (
        <div className={styles.quizzNavigation}>
            {
                pages.map(page => {
                    return (
                        <div 
                        key={`page_navigator_${page.pageNumber}`}
                        className={
                            `${styles.quizzNavigationElement} ${(activePage) === page.pageNumber ? styles.active : ''} ${blockedQuestions.includes(page.pageNumber - 1) && !isFinished ? styles.disabled : ''} ${determineIfCorrect(page.pageNumber - 1)}`
                        }
                        onClick={() => setPage(page.pageNumber - 1)}
                        >
                            {page.pageNumber}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default QuizzNavigation