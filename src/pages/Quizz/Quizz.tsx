import { useQuery } from '@tanstack/react-query';
import styles from './Quizz.module.scss';
import { QuizzProps } from './quizz.types';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Quizz = (props: QuizzProps) => {

    const { title } = props;

    return (
        <div className={styles.view}>
            <h1 className={styles.quizzTitle}>{title}</h1>
        </div>
    )
}

const QuizzProvider = () => {

    const { id } = useParams();

    const { data } = useQuery({
        queryKey: ['quizz'],
        queryFn: () => axios.get(`/quizz/get/${id}`).then(res => res.data),
    })

    console.log(data);

    return (<Quizz id={12} title={'Quizz'} description='test' color='#FFF' finished={1241212412} liked={271682} User={{username: 'admin'}}/>)
}

export default QuizzProvider;