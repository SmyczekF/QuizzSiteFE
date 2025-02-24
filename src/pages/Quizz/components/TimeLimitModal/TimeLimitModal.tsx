import { Button, Modal, ModalProps, NumberInput } from "@mantine/core";
import { useState } from "react";

type TimeLimitModalProps = {
  timeLimit: number;
  setTimeLimit: (timeLimit: number) => void;
} & ModalProps;

const TimeLimitModal = (props: TimeLimitModalProps) => {
  const { timeLimit, setTimeLimit } = props;
  const [timeLimitValue, setTimeLimitValue] = useState(timeLimit);

  const handleTimeLimitChange = (value: string | number) => {
    setTimeLimitValue(+value);
  };

  const handleTimeLimitSubmit = () => {
    setTimeLimit(timeLimitValue);
  };

  return (
    <Modal title="Time Limit" {...props}>
      <NumberInput value={timeLimitValue} onChange={handleTimeLimitChange} />
      <Button onClick={handleTimeLimitSubmit}>Set Time Limit</Button>
    </Modal>
  );
};

export default TimeLimitModal;
