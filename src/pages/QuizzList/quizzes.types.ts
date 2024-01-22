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
    image?: {type: string, data: number[]};
}

export interface ListOperationProps {
    target: JSX.Element;
    text: string;
    openedContent?: JSX.Element;
}

export interface SortProps{
    target: JSX.Element;
}

export interface PageSizePickerProps{
    pageSize: number;
    setPageSize: (limit: number) => void;
}

export interface NavigationProps{
    total: number;
    activePage: number;
    setPage: (current: number) => void;
    noPagination?: boolean;
    navigationDivStyle?: React.CSSProperties;
    noPagePicker?: boolean;
    pageSize?: number;
    setPageSize?: (limit: number) => void;
}