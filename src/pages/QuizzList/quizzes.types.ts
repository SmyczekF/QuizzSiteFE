export interface QuizzListElementProps {
    id: number;
    title: string;
    description: string;
    color: string;
    finished: number;
    liked: number;
    image?: Blob;
    User: User;
}

interface User {
    username: string;
}

export interface ListOperationProps {
    target: JSX.Element;
    text: string;
    openedContent?: JSX.Element;
}

export interface NavigationProps {
    total: number;
    activePage: number;
    setPage: (current: number) => void;
    noPagination?: boolean;
    navigationDivStyle?: React.CSSProperties;
}

export interface SortProps{
    target: JSX.Element;
}