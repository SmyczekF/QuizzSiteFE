import { Radio, RadioProps } from "@mantine/core";
import { OptionProps } from "../quizz.types";
import styles from "../Quizz.module.scss";

const RadioOption = (props: RadioProps & OptionProps) => {
  const { id, text, order, image, disabled, isCorrect, correctNotChoosen } =
    props;

  return (
    <Radio
      label={text}
      value={`${id}`}
      color="yellow"
      size="lg"
      classNames={{
        root: `${styles.checkboxOption} ${disabled ? styles.disabled : ""} ${
          isCorrect ? styles.correct : ""
        } ${isCorrect === false ? styles.incorrect : ""} ${
          correctNotChoosen ? styles.correctNotChoosen : ""
        }`,
        label: styles.checkboxOptionLabel,
        radio: styles.checkboxOptionRadio,
        inner: styles.checkboxOptionRadioInner,
        labelWrapper: styles.checkboxOptionRadioBody,
        body: styles.checkboxOptionRadioBody,
      }}
    />
  );
};

export default RadioOption;
