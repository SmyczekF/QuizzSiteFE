import { Checkbox } from "@mantine/core";
import { OptionProps } from "../quizz.types";
import styles from '../Quizz.module.scss';

const CheckboxOption = (props: OptionProps) => {

    const { id, text, order, image } = props;

    return (
        <Checkbox 
            label={text} 
            value={id} 
            classNames={{
                root: styles.checkboxOption,
                label: styles.checkboxOptionLabel,
                input: styles.checkboxOptionInput,
            }}
            color="yellow"
        />
    )
}

export default CheckboxOption