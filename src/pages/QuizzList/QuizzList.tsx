import { Grid, Group } from '@mantine/core';
import styles from './QuizzList.module.scss';
import { useContext, useEffect, useState } from 'react';
import QuizzListElement from './components/QuizzListElement';
import ListOperation from './components/ListOperation/ListOperation';
import Navigation from './components/Navigation';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { QuizzListElementProps } from './quizzes.types';
import Sort from './components/ListOperation/components/Sort';
import { QuizQueryParamsContext } from '../../shared/providers/quizQueryParamsProvider';
import PageSizePicker from './components/PageSizePicker';

const QuizzList = () => {

    const quizQueryParams = useContext(QuizQueryParamsContext);
    const [activePage, setPage] = useState(1);
    const [limit, setLimit] = useState(30);
    const { genre } = useParams();

    const { data, isLoading, refetch } = useQuery<{quizzes: QuizzListElementProps[], totalCount: number}>({
        queryKey: ['quizzList'],
        queryFn: () => axios.get(`/quizz/get/genre/${genre}`, {params: {page: activePage, limit: limit, order: quizQueryParams.order}}).then(res => res.data),
    });

    useEffect(() => {
        refetch();
        //eslint-disable-next-line
    }, [activePage, limit, quizQueryParams.order])

    if(!data) return null;

    const handlePagePicker = (value: number) => {
        if (value > Math.ceil(data.totalCount / limit)) {
            setPage(Math.ceil(data.totalCount / limit));
        } else if(value === 0) {
            return null;
        } else if (value < 1) {
            setPage(1);
        } else {
            setPage(value);
        }
    }

    return(
        <div className={styles.view}>
            <h1 className={styles.quizzListTitle}>{genre?.toUpperCase()}</h1>
            
            <div className={styles.listOperations}>
                <Navigation
                    total={Math.ceil(data.totalCount / limit)}
                    activePage={activePage}
                    setPage={handlePagePicker}
                    noPagination
                    navigationDivStyle={{
                        margin: 0,
                    }}
                />
                <Group classNames={{root: styles.listOptionsRoot}}>
                    <Sort target={<i className={`pi pi-sort ${styles.listOperation}`}></i>}/>
                    {/* TODO ADD FILTERS
                    <ListOperation
                        target={<i className={`pi pi-filter ${styles.listOperation}`}></i>}
                        text='Filter'
                    /> */}
                    <ListOperation
                        target={<i className={`pi pi-refresh ${styles.listOperation}`} onClick={() => refetch()}></i>}
                        text='Refresh'
                    />
                </Group>
            </div>
            
            {
                // TODO change loading to spinning circle
                isLoading? <p>Loading...</p>:
                <Grid>
                {
                    data.quizzes?.map((element, index) => {
                        return <Grid.Col key={index} span={{ base: 12, md: 6, lg: 4 }}>{
                            <QuizzListElement {...element} />
                        }</Grid.Col>;
                    })
                }
                </Grid>
            }
            <div className={styles.bottomNav}>
                <PageSizePicker pageSize={limit} setPageSize={(limit: number) => setLimit(limit)}/>
                <Navigation
                    total={Math.ceil(data.totalCount / limit)}
                    activePage={activePage}
                    setPage={handlePagePicker}
                    pageSize={limit}
                    setPageSize={(limit: number) => setLimit(limit)}
                />
            </div>
        </div>
    )
}

export default QuizzList;