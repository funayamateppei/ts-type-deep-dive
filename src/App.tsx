import QuizContainer from "./components/quiz-container/QuizContainer"
import {quizzes} from "./models"
import {MUI} from "./ui"

function App() {
  return (
    <MUI.Stack p={2}>
      <QuizContainer quiz={quizzes[1]} />
      <QuizContainer quiz={quizzes[2]} />
      <QuizContainer quiz={quizzes[3]} />
      <QuizContainer quiz={quizzes[4]} />
      <QuizContainer quiz={quizzes[5]} />
    </MUI.Stack>
  )
}

export default App
