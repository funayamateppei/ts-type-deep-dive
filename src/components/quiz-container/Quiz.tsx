import {MUI} from "../../ui"

interface Props {
  title: string
  description: string
  code: string
}

const Quiz = ({title, description, code}: Props) => {
  return (
    <MUI.Box>
      <MUI.Typography
        variant="h5"
        component="h2"
        sx={{
          mb: 1.5,
          fontWeight: "bold",
          color: "primary.main",
        }}
      >
        {title}
      </MUI.Typography>

      <MUI.Typography variant="body1" sx={{mb: 2.5, color: "text.secondary"}}>
        {description}
      </MUI.Typography>

      <MUI.Paper
        elevation={0}
        sx={{
          bgcolor: "grey.50",
          borderRadius: 2,
          overflow: "hidden",
          border: 1,
          borderColor: "grey.200",
        }}
      >
        <MUI.Box
          component="pre"
          sx={{
            margin: 0,
            padding: "16px",
            fontSize: "0.9rem",
            fontFamily: "'Consolas', 'Monaco', 'Andale Mono', monospace",
            overflowX: "auto",
            whiteSpace: "pre",
            backgroundColor: "grey.50",
            "& .code-line": {
              display: "block",
              position: "relative",
              fontFamily: "inherit",
            },
          }}
        >
          {code}
        </MUI.Box>
      </MUI.Paper>
    </MUI.Box>
  )
}

export default Quiz
