import { EQuestionTypes, OptionProps, QuestionProps } from "../quizz.types"
import RadioOption from "./RadioOption";
import CheckboxOption from "./CheckboxOption";
import styles from '../Quizz.module.scss';
import { Checkbox, Grid, Group, Radio, Text, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";

const Question = (props: QuestionProps) => {
    
    const { id, text, type, Options, active, returnAnswer, viewMode, answers, correctAnswers, isCorrect, notAnswered } = props;
    const [value, setValue] = useState<string>('0');
    const [values, setValues] = useState<string[]>([]);

    const determineOptionType = (optionProps: OptionProps) => {
        switch (type) {
            case EQuestionTypes.SingleChoice:
                return <RadioOption {...optionProps} disabled={viewMode}/>
            case EQuestionTypes.MultipleChoice:
                return <CheckboxOption {...optionProps} disabled={viewMode}/>
            default:
                return <TextInput/>;
        }
    }

    useEffect(() => {
        handleSubmit();
    }, [value, values])

    const handleSubmit = () => {
        if(parseInt(value) === 0 && values.length === 0) return;
        returnAnswer(id, parseInt(value) || null, values.map(v => parseInt(v) === 0 ? 0 : parseInt(v)) || null);
    }

    return (
        <div className={`${styles.question} ${active ? styles.active : ''}`}>
            <h3 className={styles.questionTitle}>{text}</h3>
            <Radio.Group
            value={value}
            onChange={setValue}
            style={{width: '100%'}}
            >
            <Checkbox.Group
            value={values}
            onChange={setValues}
            style={{width: '100%'}}
            >
            <Grid classNames={{col: styles.answerContainer}}>
                <Grid.Col span={12}>
                    <Text classNames={{root: `${styles.answersDescription} ${isCorrect && viewMode ? styles.correct : ''} ${isCorrect !== undefined && !isCorrect && viewMode ? styles.incorrect : ''}`}}>
                        {
                        viewMode 
                        ? notAnswered 
                            ? 'Not answered!'
                            : isCorrect ? 'Correct!' : 'Incorrect!' 
                        : type === EQuestionTypes.SingleChoice ? 'Choose one answer' : 'Choose all the correct answers'
                        }
                    </Text>
                </Grid.Col>
            {
                Options.sort((a, b) => a.order - b.order).map(option => {
                    if(viewMode && answers && correctAnswers) {
                        if(type === EQuestionTypes.SingleChoice) 
                            if(+option.id === answers.answerId)
                                option.correct = +option.id === correctAnswers.answerId;
                            else if(+option.id === correctAnswers.answerId)
                                option.correctNotChoosen = true;
                            else
                                option.correct = undefined;
                        else
                            if(answers.answerIds?.includes(+option.id))
                                option.correct = correctAnswers.answerIds?.includes(+option.id);
                            else if(correctAnswers.answerIds?.includes(+option.id))
                                option.correctNotChoosen = true;
                            else
                                option.correct = undefined;
                    }
                    return (
                        <Grid.Col key={`${text}_${option.id}`} span={{base: 12, xs: 12, sm: 6, lg: 6, xl: 4}}>
                            {determineOptionType(option)}
                        </Grid.Col>
                    )
                })
            }
            </Grid>
            </Checkbox.Group>
            </Radio.Group>
        </div>
    )
}

export default Question