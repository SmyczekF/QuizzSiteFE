import { createContext, useState, ReactNode } from 'react';
import { ESortType } from '../../pages/QuizzList/components/ListOperation/components/sort.types';

interface QuizQueryParamsContextProps {
    order: string[];
    handleSetOrder: (order: ESortType) => void;
}

export const QuizQueryParamsContext = createContext<QuizQueryParamsContextProps>({
    order: ["finished", "DESC"],
    handleSetOrder: () => {},
});

export const QuizQueryParamsContextProvider = ({ children }: { children: ReactNode }) => {

    const [order, setOrder] = useState<string[]>(["finished", "DESC"]);

    const handleSetOrder = (order: ESortType) => {
        const temp = order.split(',');
        setOrder(temp);
    }

    return (
        <QuizQueryParamsContext.Provider value={{ order, handleSetOrder }}>
            {children}
        </QuizQueryParamsContext.Provider>
    );
};
