export interface TextInputWithEditProps {
  initialValue: string;
  onChange: (value: string) => void;
  editAction?: () => void;
  resetIsEditing?: boolean | null;
  startedEditionCallback?: () => void;
  errorMsg?: string;
  placeholder?: string;
}
