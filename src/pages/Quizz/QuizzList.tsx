import { Grid, Group, NumberInput, Pagination, Text } from '@mantine/core';
import styles from './QuizzList.module.scss';
import { QuizzListProps } from './quizzes.types';
import { useState } from 'react';
import QuizzListElement from './components/QuizzListElement';
import ListOperation from './components/ListOperation';
import { useMediaQuery } from 'react-responsive';

const QuizzList = (props: QuizzListProps) => {

    const [activePage, setPage] = useState(1);
    const { title } = props;
    const isMd = useMediaQuery({ query: '(min-width: 780px)' });
    
    const data = [
        <QuizzListElement title="Wielka Bitwa Mózgów" description="Tajny test na największe umysły" color="#C93C20" author="admin" finished={1395138} liked={21784612} />,
        <QuizzListElement title="Tajemnice Kosmosu" description="Czy znasz sekrety wszechświata?" color="#6C4675" author="admin" finished={1395138} liked={21784612} />,
        <QuizzListElement title="Światowe Smaki" description="Test Twojej kulinarności" color="#35682D" author="admin" finished={1395138} liked={21784612} />,
        <QuizzListElement title="Historia Muzycznych Rewolucji" description="Przeżyj historię muzyki" color="#20603D" author="admin" finished={1395138} liked={21784612} />,
        <QuizzListElement title="Rozpoznawanie Flag" description="Czy potrafisz rozpoznać kraje po flagach?" color="#999950" author="admin" finished={1395138} liked={21784612} />,
        <QuizzListElement title="Technologie Przyszłości" description="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean m" color="#403A3A" author="admin" finished={1395138} liked={21784612} />,
        <QuizzListElement title="Ciekawostki Naukowe" description="Zaskakujące fakty o świecie" color="#C7B446" author="admin" finished={1395138} liked={21784612} />,
        <QuizzListElement title="Test Ortograficzny" description="Mistrzostwo w poprawnej pisowni" color="#D53032" author="admin" finished={1395138} liked={21784612} />,
        <QuizzListElement title="Gdzie na Świecie To Znajdziesz?" description="Test geograficzny" color="#3B83BD" author="admin" finished={1395138} liked={21784612} />,
        <QuizzListElement title="Quiz Kolorów" description="Rozpoznawanie kolorów na ekranie" color="#CDA434" author="admin" finished={1395138} liked={21784612} />,

    ]

    const handlePagePicker = (value: number) => {
        if (value > data.length) {
            setPage(data.length);
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
            <h1 className={styles.quizzListTitle}>{title}</h1>
            <div className={styles.listOperations}>
                <Group>
                    <ListOperation 
                        target={<i className={`pi pi-sync ${styles.listOperation}`}></i>} 
                        text='Random quizz'
                    />
                    <ListOperation
                        target={<i className={`pi pi-sort ${styles.listOperation}`}></i>}
                        text='Sort'
                    />
                    <ListOperation
                        target={<i className={`pi pi-filter ${styles.listOperation}`}></i>}
                        text='Filter'
                    />
                    <ListOperation
                        target={<i className={`pi pi-refresh ${styles.listOperation}`}></i>}
                        text='Refresh'
                    />
                </Group>
            </div>
            <Grid>
                {data.map((element, index) => {
                    return <Grid.Col key={index} span={{ base: 12, md: 6, lg: 4 }}>{element}</Grid.Col>;
                })}
            </Grid>
            <div className={styles.navigation}>
                {
                    !isMd 
                    ? <ListOperation
                        target={
                            <i className={`pi pi-arrow-left ${styles.listOperation}`} onClick={() => handlePagePicker(activePage - 1)}></i>
                        }
                        text='Last page'
                    /> 
                    : null
                }
                <div className={styles.pagePicker}>
                    {/* <Text className={styles.pagePickerText}>Page</Text> */}
                    <NumberInput
                        min={1} 
                        max={data.length} 
                        value={activePage} 
                        onChange={value => handlePagePicker(+value)} 
                        classNames={{
                            root: styles.pagePickerRoot,
                            input: styles.pagePickerInput,
                        }} 
                        w={60}
                        allowNegative={false}
                        allowDecimal={false}
                        size='sm'
                        rightSection={<></>}
                        rightSectionWidth={8}
                    />
                    <Text className={styles.pagePickerText}> / {data.length}</Text>
                </div>
                {
                    isMd 
                    ? <div className={styles.pagination}>
                        <Pagination 
                            value={activePage} 
                            onChange={setPage} 
                            total={data.length} 
                            color='yellow'
                            classNames={{
                                root: styles.paginationRoot,
                                control: styles.paginationControl,
                                dots: styles.paginationDots,
                            }}
                            size={'md'}
                        />
                    </div> 
                    : <ListOperation
                        target={
                            <i className={`pi pi-arrow-right ${styles.listOperation}`} onClick={() => handlePagePicker(activePage + 1)}></i>
                        }
                        text='Next page'
                    /> 
                }
                
            </div>
        </div>
    )
}

export default QuizzList;