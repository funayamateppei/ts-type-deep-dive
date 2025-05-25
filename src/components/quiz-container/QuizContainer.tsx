import {useState} from "react"
import Quiz from "./Quiz"
import Choices from "./Choices"
import Answer from "./Answer"
import type {QuizData} from "../../models"
import {MUI} from "../../ui"

const quizData: QuizData = {
  title: "クイズ1: プリミティブ型ラッパーオブジェクトの罠",
  description:
    "JavaScriptのプリミティブ型が持つオブジェクトラッパーの挙動と、TypeScriptの型推論が絡む問題です。以下のTypeScriptコードの出力は何になるでしょう？",
  code: `function getLength(arg: string | String): number {
  if (typeof arg === 'string') {
    return arg.length;
  }
  return arg.length;
}

const str1 = "Hello";
const str2 = new String("World");

console.log(getLength(str1));
console.log(getLength(str2));`,
  choices: [
    {id: "A", text: "5 と 5"},
    {id: "B", text: "5 と TypeError"},
    {id: "C", text: "5 と undefined"},
    {id: "D", text: "TypeError と 5"},
  ],
  correctAnswer: "A",
  explanation: `この問題のポイントは、JavaScriptのプリミティブ型である string と、オブジェクトとしての String 型の違い、そしてTypeScriptの型ガードの挙動です。

1. typeof arg === 'string' の挙動:
JavaScriptにおいて、typeof 演算子はプリミティブ型とオブジェクト型を区別します。
"Hello" の typeof は 'string' です。
new String("World") の typeof は 'object' です。

2. TypeScriptの型ガード:
if (typeof arg === 'string') のブロック内では、TypeScriptの型推論によって arg の型が string に絞り込まれます。このため、arg.length は問題なく呼び出せます。

3. String オブジェクトの length プロパティ:
new String("World") は String オブジェクトを生成します。JavaScriptの String オブジェクトは、そのインスタンスが保持する文字列の長さを返す length プロパティを持っています。したがって、str2.length も 5 を返します。

4. else ブロックの型:
else ブロックでは、arg の型は String に絞り込まれます。String オブジェクトには length プロパティが存在するため、arg.length はエラーなくアクセスできます。

TypeScriptは型の厳密さを提供しますが、JavaScriptのランタイムの挙動を完全に変えるわけではありません。この例は、JavaScriptのプリミティブ型ラッパーオブジェクトの特性と、TypeScriptの型ガードがどのように連携するかを示す好例です。`,
}

const QuizContainer = () => {
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
      <Quiz title={quizData.title} description={quizData.description} code={quizData.code} />

      <Choices
        choices={quizData.choices}
        selectedChoice={selectedChoice}
        correctAnswer={showAnswer ? quizData.correctAnswer : null}
        onChoiceSelect={handleChoiceSelect}
        disabled={showAnswer}
      />

      {showAnswer && (
        <Answer
          isCorrect={selectedChoice === quizData.correctAnswer}
          explanation={quizData.explanation}
          onReset={handleReset}
        />
      )}
    </MUI.Stack>
  )
}

export default QuizContainer
