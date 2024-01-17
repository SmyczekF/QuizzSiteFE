import { NumberInput, Pagination, Text } from "@mantine/core";
import ListOperation from "./ListOperation";
import styles from '../QuizzList.module.scss';
import { NavigationProps } from "../quizzes.types";
import { useMediaQuery } from "react-responsive";

const Navigation = (props: NavigationProps) => {

    const { activePage, setPage, total, noPagination, navigationDivStyle } = props;

    const isMd = useMediaQuery({ query: '(min-width: 780px)' });

    return (
        <div className={styles.navigation} style={navigationDivStyle}>
                {
                    noPagination || !isMd 
                    ? <ListOperation
                        target={
                            <i className={`pi pi-chevron-left ${styles.listOperation}`} onClick={() => setPage(activePage - 1)}></i>
                        }
                        text='Last page'
                    /> 
                    : null
                }
                <div className={styles.pagePicker}>
                    {/* <Text className={styles.pagePickerText}>Page</Text> */}
                    <NumberInput
                        min={1} 
                        max={total} 
                        value={activePage} 
                        onChange={value => setPage(+value)} 
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
                    <Text className={styles.pagePickerText}> / {total}</Text>
                </div>
                {
                    !noPagination && isMd 
                    ? <div className={styles.pagination}>
                        <Pagination 
                            value={activePage} 
                            onChange={setPage} 
                            total={total} 
                            color='yellow'
                            classNames={{
                                root: styles.paginationRoot,
                                control: styles.paginationControl,
                                dots: styles.paginationDots,
                            }}
                            size={'lg'}
                            radius={'xl'}
                        />
                    </div> 
                    : <ListOperation
                        target={
                            <i className={`pi pi-chevron-right ${styles.listOperation}`} onClick={() => setPage(activePage + 1)}></i>
                        }
                        text='Next page'
                    /> 
                }
                
            </div>
    )
}
export default Navigation;