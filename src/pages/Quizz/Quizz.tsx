import styles from './Quizz.module.scss';
import { QuizzProps } from './quizz.types';

const Quizz = (props: QuizzProps) => {

    const { title } = props;

    return (
        <div className={styles.view}>
            <h1 className={styles.quizzTitle}>{title}</h1>
        </div>
    )
}

const QuizzProvider = () => {
    return (<Quizz id={12} title={'Quizz'} description='test' color='#FFF' author='admin' finished={1241212412} liked={271682}/>)
}

export default QuizzProvider;