import {MUI, MuiIcons} from "../../ui"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import CancelIcon from "@mui/icons-material/Cancel"
import RefreshIcon from "@mui/icons-material/Refresh"

interface Props {
  isCorrect: boolean
  explanation: string
  onReset: () => void
}

const Answer = ({isCorrect, explanation, onReset}: Props) => {
  return (
    <MUI.Stack gap={2}>
      <MUI.Alert severity={isCorrect ? "success" : "error"} icon={isCorrect ? <CheckCircleIcon /> : <CancelIcon />}>
        {isCorrect ? "正解です！おめでとうございます！" : "残念！不正解です。もう一度挑戦してみましょう！"}
      </MUI.Alert>

      <MUI.Accordion
        sx={{
          p: 3,
          backgroundColor: "rgba(0, 0, 0, 0.02)",
          borderRadius: 2,
        }}
      >
        <MUI.AccordionSummary expandIcon={<MuiIcons.ExpandMore />}>
          <MUI.Typography variant="body1">解説</MUI.Typography>
        </MUI.AccordionSummary>

        <MUI.AccordionDetails sx={{p: 0, mb: 2}}>
          <MUI.Divider sx={{mb: 2}} />
          <MUI.Typography variant="body1" component="div" whiteSpace={"pre-line"}>
            {explanation}
          </MUI.Typography>
        </MUI.AccordionDetails>
      </MUI.Accordion>

      <MUI.Box sx={{mt: 3, textAlign: "center"}}>
        <MUI.Button variant="contained" color="primary" startIcon={<RefreshIcon />} onClick={onReset}>
          もう一度挑戦する
        </MUI.Button>
      </MUI.Box>
    </MUI.Stack>
  )
}

export default Answer
