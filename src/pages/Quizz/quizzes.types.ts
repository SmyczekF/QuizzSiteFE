export interface QuizzListProps {
    title: string;
}

export interface QuizzListElementProps {
    title: string;
    description: string;
    color: string;
    author: string;
    finished: number;
    liked: number;
}

export interface ListOperationProps {
    target: JSX.Element;
    text: string;
}

export interface NavigationProps {
    total: number;
    activePage: number;
    setPage: (current: number) => void;
    noPagination?: boolean;
    navigationDivStyle?: React.CSSProperties;
}