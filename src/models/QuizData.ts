import type {Choice} from "./Choice"

export type QuizData = {
  title: string
  description: string
  code: string
  choices: Choice[]
  correctAnswer: string
  explanation: string
}
