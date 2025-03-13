import { Checkbox, CheckboxProps } from "@mantine/core";
import { OptionProps } from "../quizz.types";
import styles from "../Quizz.module.scss";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";

const CheckboxOption = (props: CheckboxProps & OptionProps) => {
  const { id, text, order, image, disabled, isCorrect, correctNotChoosen } =
    props;
  const [checked, { toggle }] = useDisclosure(false);

  return (
    <Checkbox
      label={text}
      value={id}
      size="lg"
      classNames={{
        root: `${styles.checkboxOption} ${checked ? styles.checked : ""} ${
          disabled ? styles.disabled : ""
        } ${isCorrect ? styles.correct : ""} ${
          isCorrect !== undefined && !isCorrect ? styles.incorrect : ""
        } ${correctNotChoosen ? styles.correctNotChoosen : ""}`,
        label: styles.checkboxOptionLabel,
        input: styles.checkboxOptionInput,
        inner: styles.checkboxOptionRadioInner,
        labelWrapper: styles.checkboxOptionRadioBody,
        body: styles.checkboxOptionRadioBody,
      }}
      onClick={toggle}
    />
  );
};

export default CheckboxOption;
