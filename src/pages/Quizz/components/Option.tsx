import { OptionProps } from "../quizz.types";

const Option = (props: OptionProps) => {

    const { id, text, order, image } = props;

    return (
        <div>
            {text}
        </div>
    )
}

export default Option