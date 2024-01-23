import { EQuestionTypes, OptionProps, QuestionProps } from "../quizz.types"
import RadioOption from "./RadioOption";
import CheckboxOption from "./CheckboxOption";
import styles from '../Quizz.module.scss';
import { Group, Radio, TextInput } from "@mantine/core";
import { useState } from "react";

const Question = (props: QuestionProps) => {
    
    const { id, text, order, type, Options } = props;
    const [value, setValue] = useState<string>('0');

    console.log(value)

    const determineOptionType = (optionProps: OptionProps) => {
        switch (type) {
            case EQuestionTypes.SingleChoice:
                return <RadioOption {...optionProps}/>
            case EQuestionTypes.MultipleChoice:
                return <CheckboxOption {...optionProps}/>
            default:
                return <TextInput/>;
        }
    }

    return (
        <div className={styles.question}>
            <h3 className={styles.questionTitle}>{text}</h3>
            <Radio.Group
            value={value}
            onChange={setValue}
            style={{width: '100%'}}
            >
            <Group justify="space-between" w={'100%'}>
            {
                Options.map(option => {
                    return (
                        <div key={`${text}_${option.id}`}>
                            {determineOptionType(option)}
                        </div>
                    )
                })
            }
            </Group>
            </Radio.Group>
        </div>
    )
}

export default Question