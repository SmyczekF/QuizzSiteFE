import { QuestionProps } from "../quizz.types"
import Option from "./Option";


const Question = (props: QuestionProps) => {
    
    const { id, text, order, type, Options } = props;

    return (
        <div>
            {text}
            {
                Options.map(option => {
                    return <Option {...option} key={`${option.text}_${option.id}`}/>
                })
            }
        </div>
    )
}

export default Question