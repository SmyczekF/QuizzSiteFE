export interface TextInputWithEditProps {
    initialValue: string;
    onChange: (value: string) => void;
    editAction?: () => void;
}