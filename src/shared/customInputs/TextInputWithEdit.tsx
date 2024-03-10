import { TextInput } from "@mantine/core";
import { TextInputWithEditProps } from "./customInputs.types";
import { useState } from "react";

const TextInputWithEdit = (props: TextInputWithEditProps) => {

    const { initialValue, onChange, editAction } = props;

    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(initialValue);

    const handleOnChange = (value: string) => {
        setValue(value);
        onChange(value);
    }

    return(
        <TextInput
            value={value}
            onChange={(event) => handleOnChange(event.currentTarget.value)}
            disabled={!isEditing}
            rightSection={
                <i 
                    className={`pi ${isEditing ? 'pi-check' : 'pi-pencil'}`} 
                    style={{cursor: 'pointer'}}
                    onClick={editAction ? editAction : () => setIsEditing(!isEditing)}
                />
            }
        />
    )
}

export default TextInputWithEdit;