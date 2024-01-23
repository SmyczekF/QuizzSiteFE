import { Radio, RadioProps } from "@mantine/core";
import { OptionProps } from "../quizz.types";
import styles from '../Quizz.module.scss';

const RadioOption = (props: RadioProps & OptionProps) => {

    const { id, text, order, image } = props;

    

    return (
        <Radio 
        label={text} 
        value={`${id}`}
        color="yellow"
        classNames={{
            root: styles.checkboxOption,
            label: styles.checkboxOptionLabel,
            radio: styles.checkboxOptionRadio,
        }}
        />
    )
}

export default RadioOption;