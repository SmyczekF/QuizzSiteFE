import { QuizzListElementProps } from "../quizzes.types";
import styles from '../QuizzList.module.scss';
import fr from '../../../shared/flags/fr.svg';

const getShortenedNumberData = (number: number) => {
    if (number >= 1000000) {
        return `${(number / 1000000).toFixed(1)}M`;
    }
    if (number >= 1000) {
        return `${(number / 1000).toFixed(1)}K`;
    }
    return number;
}

const QuizzListElement = (props: QuizzListElementProps) => {
    
    const { title, description, color, author, finished, liked } = props;
    
    return (
        <div className={styles.quizzListElement} style={{background: color}}>
            <h2 className={styles.quizzListElementTitle}>{title}</h2>
            {/* <p className={styles.quizzListElementDescription}>{description}</p> */}
            <div className={styles.quizzListElementAuthorSection}>
                <img src={fr} alt='Flag' className={styles.quizzListElementAuthorAvatar}/>
                <p className={styles.quizzListElementAuthorName}>{author}</p>
            </div>
            <div className={styles.quizzListElementInfoSection}>
                <div className={styles.quizzListElementInfo}>
                    <i className={`pi pi-flag ${styles.quizzListElementInfoIcon}`}></i>
                    <p className={styles.quizzListElementInfoData}>{getShortenedNumberData(finished)}</p>
                </div>
                <div className={styles.quizzListElementInfo}>
                    <i className={`pi pi-star ${styles.quizzListElementInfoIcon}`} style={{color: 'gold'}}></i>
                    <p className={styles.quizzListElementInfoData}>{getShortenedNumberData(liked)}</p>
                </div>
            </div>
        </div>
    )
}

export default QuizzListElement
