import { useQuery } from '@tanstack/react-query';
import styles from './Quizz.module.scss';
import { Answers, QuizzProps } from './quizz.types';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Question from './components/Question';
import { getShortenedNumberData } from '../QuizzList/components/QuizzListElement';
import { Button } from '@mantine/core';
import { useState } from 'react';

const Quizz = (props: QuizzProps) => {

    const { title, description, finished, liked, image, User, Questions, createdAt } = props;

    const [shownQuestion, setShownQuestion] = useState<number>(-1)
    const [answers, setAnswers] = useState<Answers[]>([]); 

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

    const handleAnswerReturn = (questionId: number, answerId: number | null, answerIds: number[] | null) => {
        const newAnswers = [...answers];
        const questionIndex = newAnswers.findIndex(a => a.questionId === questionId);
        if(questionIndex === -1) {
            newAnswers.push({
                questionId,
                answerId,
                answerIds
            })
        } else {
            newAnswers[questionIndex] = {
                questionId,
                answerId,
                answerIds
            }
        }
        setAnswers(newAnswers);
    }

    return (
        <div className={styles.view}>
            {/* <Background/> */}
            {/* Opacity 1A | 33 | 4D | 66 | 80 | 99 | B3 | CC | E6 */}
            {/* <div className={styles.content}> */}
            
                <div className={`${styles.quizzTop} ${shownQuestion > -1 ? styles.quizzTopAnimation: ''}`}>
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
                                    <div className={styles.quizzInfoItemValue}>{getShortenedNumberData(finished)}</div>
                                </div>
                            </div>
                            <div className={styles.quizzInfoItem}>
                                <div className={styles.quizzInfoItemTitle}>Liked</div>
                                <div className={styles.quizzInfoItemValueWithIcon}>
                                    <i className={`pi pi-star ${styles.quizzInfoItemLikedImage}`} style={{color: 'gold'}}></i>
                                    <div className={styles.quizzInfoItemValue}>{getShortenedNumberData(liked)}</div>
                                </div>
                            </div>
                            <div className={styles.quizzInfoItem}>
                                <div className={styles.quizzInfoItemTitle}>Created</div>
                                <div className={styles.quizzInfoItemValueWithIcon}>
                                    <i className={`pi pi-calendar ${styles.quizzInfoItemLikedImage}`} style={{color: 'white'}}></i>
                                    <div className={styles.quizzInfoItemValue}>{new Date(createdAt).toLocaleDateString()}</div>
                                </div>
                            </div>
                        </div>
                    {/* </div> */}
                </div>
                <h3 className={styles.typeQuizQuestionTitle}>Choose the type of quiz</h3>
                <div className={styles.quizzBottomContent}>
                    <Button 
                    size="lg" 
                    color='transparent' 
                    classNames={{root: styles.quizzTypeChooseRoot, label: styles.quizzTypeChooseLabel}}
                    onClick={() => setShownQuestion(0)}
                    >
                        <i className={`pi pi-stopwatch ${styles.quizzTypeChooseIcon}`}></i>
                        <h4 className={styles.quizzTypeChooseText}>Time limit</h4>
                    </Button>
                    <Button 
                    size="lg" 
                    color='transparent' 
                    classNames={{root: styles.quizzTypeChooseRoot, label: styles.quizzTypeChooseLabel}}
                    onClick={() => setShownQuestion(0)}
                    >
                        <i className={`pi pi-times-circle ${styles.quizzTypeChooseIcon}`}></i>
                        <h4 className={styles.quizzTypeChooseText}>No time limit</h4>
                    </Button>
                </div>
            </div>
            <div className={`${styles.quizzSection} ${shownQuestion !== -1 ? styles.active : ''}`}>
                {
                    Questions.sort((a, b) => a.order - b.order).map((question, index) => {
                        return <Question {...question} key={`${question.text}_${question.id}`} active={shownQuestion === index} returnAnswer={handleAnswerReturn}/>
                    })
                }
                <div className={styles.quizzSectionButtons}>
                    <Button 
                    size="lg" 
                    color='transparent' 
                    classNames={{root: styles.quizzSectionButtonRoot, label: styles.quizzSectionButtonLabel}}
                    onClick={() => setShownQuestion(shownQuestion - 1)}
                    >
                        <i className={`pi pi-arrow-left ${styles.quizzSectionButtonIcon}`}></i>
                        <h4 className={styles.quizzSectionButtonText}>Back</h4>
                    </Button>
                    {
                    Questions.length > shownQuestion + 1 
                    ? <Button 
                    size="lg" 
                    color='transparent' 
                    classNames={{root: styles.quizzSectionButtonRoot, label: styles.quizzSectionButtonLabel}}
                    onClick={() => setShownQuestion(shownQuestion + 1)}
                    >
                        <h4 className={styles.quizzSectionButtonText}>Next</h4>
                        <i className={`pi pi-arrow-right ${styles.quizzSectionButtonIcon}`}></i>
                    </Button>
                    : <Button 
                    size="lg" 
                    color='transparent' 
                    classNames={{root: styles.quizzSectionButtonRoot, label: styles.quizzSectionButtonLabel}}
                    onClick={() => console.log(answers)}
                    >
                        <h4 className={styles.quizzSectionButtonText}>Finish</h4>
                        <i className={`pi pi-arrow-right ${styles.quizzSectionButtonIcon}`}></i>
                    </Button>
                    }
                </div>
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