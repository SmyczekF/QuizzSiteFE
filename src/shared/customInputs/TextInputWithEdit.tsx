import { TextInput } from "@mantine/core";
import { TextInputWithEditProps } from "./customInputs.types";
import { useEffect, useState } from "react";

const TextInputWithEdit = (props: TextInputWithEditProps) => {

    const { initialValue, onChange, editAction, resetIsEditing, startedEditionCallback, errorMsg } = props;

    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        if(typeof resetIsEditing !== 'boolean') return;
        else if(resetIsEditing) setIsEditing(false);
    }, [resetIsEditing]);

    useEffect(() => {
        if(isEditing && startedEditionCallback) startedEditionCallback();
    }, [isEditing]);

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
                    onClick={
                        editAction ? editAction : () => setIsEditing(!isEditing)
                    }
                />
            }
            error={errorMsg}
        />
    )
}

export default TextInputWithEdit;