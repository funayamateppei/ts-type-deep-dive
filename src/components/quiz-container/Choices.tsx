import {MUI} from "../../ui"
import type {Choice} from "../../models"

interface ChoiceItemProps {
  children: React.ReactNode
  onClick: () => void
  selected?: boolean
  correct?: boolean | null
  incorrect?: boolean
  disabled?: boolean
}

const ChoiceItem = ({onClick, children, selected, correct, incorrect, disabled}: ChoiceItemProps) => {
  let backgroundColor = "transparent"

  if (selected) {
    backgroundColor = "action.selected"
  }

  if (correct) {
    backgroundColor = "success.light"
  }

  if (incorrect) {
    backgroundColor = "error.light"
  }

  return (
    <MUI.ButtonBase
      onClick={onClick}
      disabled={disabled}
      sx={{
        p: 2,
        borderRadius: 2,
        justifyContent: "flex-start",
        transition: "all 0.2s",
        border: 1,
        borderColor: "grey.300",
        backgroundColor: backgroundColor,
        "&:hover": {
          backgroundColor: disabled ? backgroundColor : "action.hover",
        },
      }}
    >
      {children}
    </MUI.ButtonBase>
  )
}

interface Props {
  choices: Choice[]
  selectedChoice: string | null
  correctAnswer: string | null
  onChoiceSelect: (choice: string) => void
  disabled: boolean
}

const Choices = ({choices, selectedChoice, correctAnswer, onChoiceSelect, disabled}: Props) => {
  return (
    <MUI.Box sx={{mb: 4}}>
      <MUI.Typography variant="h6" sx={{mb: 2, fontWeight: 500}}>
        選択肢:
      </MUI.Typography>

      <MUI.Stack spacing={2}>
        {choices.map((choice) => {
          const isSelected = choice.id === selectedChoice
          const isCorrect = correctAnswer ? choice.id === correctAnswer : false
          const isIncorrect = !!(selectedChoice === choice.id && correctAnswer && selectedChoice !== correctAnswer)

          return (
            <ChoiceItem
              key={choice.id}
              onClick={() => !disabled && onChoiceSelect(choice.id)}
              selected={isSelected}
              correct={isCorrect}
              incorrect={isIncorrect}
              disabled={disabled}
            >
              <MUI.Stack direction={"row"} alignItems="center" gap={2}>
                <MUI.Avatar
                  sx={{
                    bgcolor: isSelected ? "primary.main" : isCorrect ? "success.main" : isIncorrect ? "error.main" : "grey.400",
                  }}
                >
                  {choice.id}
                </MUI.Avatar>
                <MUI.Typography variant="body1">{choice.text}</MUI.Typography>
              </MUI.Stack>
            </ChoiceItem>
          )
        })}
      </MUI.Stack>
    </MUI.Box>
  )
}

export default Choices
