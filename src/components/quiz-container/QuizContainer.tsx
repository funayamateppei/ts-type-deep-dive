import {useState} from "react"
import Quiz from "./Quiz"
import Choices from "./Choices"
import Answer from "./Answer"
import type {QuizData} from "../../models"
import {MUI} from "../../ui"

type Props = {
  quiz: QuizData
}

const QuizContainer = ({quiz}: Props) => {
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null)
  const [showAnswer, setShowAnswer] = useState(false)

  const handleChoiceSelect = (choiceId: string) => {
    setSelectedChoice(choiceId)
    setShowAnswer(true)
  }

  const handleReset = () => {
    setSelectedChoice(null)
    setShowAnswer(false)
  }

  return (
    <MUI.Stack gap={1}>
      <Quiz title={quiz.title} description={quiz.description} code={quiz.code} />

      <Choices
        choices={quiz.choices}
        selectedChoice={selectedChoice}
        correctAnswer={showAnswer ? quiz.correctAnswer : null}
        onChoiceSelect={handleChoiceSelect}
        disabled={showAnswer}
      />

      {showAnswer && (
        <Answer isCorrect={selectedChoice === quiz.correctAnswer} explanation={quiz.explanation} onReset={handleReset} />
      )}
    </MUI.Stack>
  )
}

export default QuizContainer
