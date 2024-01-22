import { useQuery } from '@tanstack/react-query';
import styles from './Quizz.module.scss';
import { QuizzProps } from './quizz.types';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Question from './components/Question';

const Quizz = (props: QuizzProps) => {

    const { title, description, color, finished, liked, image, User, Questions } = props;

    const returnAvatar = () => {
        if(User.image) {
            const base64 = btoa(
                new Uint8Array(User.image.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                '',
                ),
            );
            return `data:image/png;base64,${base64}`;
        }
        return null;
    }

    const userAvatar = returnAvatar();

    return (
        <div className={styles.view}>
            {/* <Background/> */}
            {/* Opacity 1A | 33 | 4D | 66 | 80 | 99 | B3 | CC | E6 */}
            {/* <div className={styles.content}> */}
                <div className={styles.quizzTop}>
                    <div className={styles.quizzTopContent}>
                        <h1 className={styles.quizzTitle}>{title}</h1>
                        <div className={styles.quizzDescription}>{description}</div>
                        <div className={styles.quizzInfo}>
                            <div className={styles.quizzInfoItem}>
                                <div className={styles.quizzInfoItemTitle}>Author</div>
                                <div className={styles.quizzInfoItemValueWithIcon}>
                                    {
                                        userAvatar
                                        ? <img src={userAvatar} alt="Author" className={styles.quizzInfoItemAuthorImage} style={{padding: 0}}/>
                                        : <i className={`pi pi-user ${styles.quizzInfoItemAuthorImage}`}></i>
                                    }
                                    <div className={styles.quizzInfoItemValue}>{User.username}</div>
                                </div>
                            </div>
                            <div className={styles.quizzInfoItem}>
                                <div className={styles.quizzInfoItemTitle}>Finished</div>
                                <div className={styles.quizzInfoItemValueWithIcon}>
                                    <i className={`pi pi-check ${styles.quizzInfoItemFinishedImage}`} style={{color: 'lightgreen'}}></i>
                                    <div className={styles.quizzInfoItemValue}>{finished}</div>
                                </div>
                            </div>
                            <div className={styles.quizzInfoItem}>
                                <div className={styles.quizzInfoItemTitle}>Liked</div>
                                <div className={styles.quizzInfoItemValueWithIcon}>
                                    <i className={`pi pi-star ${styles.quizzInfoItemLikedImage}`} style={{color: 'lightgreen'}}></i>
                                    <div className={styles.quizzInfoItemValue}>{liked}</div>
                                </div>
                            </div>
                        </div>
                    {/* </div> */}
                </div>
                {
                    Questions.map(question => {
                        return <Question {...question} key={`${question.text}_${question.id}`}/>
                    })
                }
            </div>
        </div>
    )
}

const QuizzProvider = () => {

    const { id } = useParams();

    const { data } = useQuery<QuizzProps>({
        queryKey: ['quizz'],
        queryFn: () => axios.get(`/quizz/get/${id}`).then(res => res.data),
    })

    console.log(data);

    //TODO ADD LOADING SCREEN
    return (
        <>
            {
                data ? <Quizz {...data}/> : null
            }
        </>
    )
}

export default QuizzProvider;