import { QuizFinishProps } from "../quizz.types"


const QuizFinish = (props: QuizFinishProps) => {

    const { score } = props;

    return (
        <div>
            <h1>Quiz Finish</h1>
            <h2>Your score is: {score}</h2>
        </div>
    )
}

export default QuizFinish