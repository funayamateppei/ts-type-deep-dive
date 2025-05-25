import { MUI } from "../mui"

declare module "@mui/material/styles" {
  interface Palette {
    appHeader: MUI.PaletteColor
    surface: { rug: string }
    foreground: { muted: string }
  }
  interface PaletteOptions {
    appHeader?: MUI.PaletteColorOptions
    surface?: { rug?: string }
    foreground?: { muted?: string }
  }
  interface BreakpointOverrides {
    mobile: true
    bigMobile: true
    tablet: true
    desktop: true
  }
}

declare module "@mui/material/AppBar" {
  interface AppBarPropsColorOverrides {
    appHeader: true
  }
}

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const palette: MUI.PaletteOptions = {
    mode: "light",
    appHeader: {
      main: "#003198",
      light: MUI.lighten("#003198", 0.3),
      dark: MUI.darken("#003198", 0.3),
      contrastText: "#fff",
    },
    primary: {
      main: "#005aff",
      light: MUI.lighten("#005aff", 0.3),
      dark: MUI.darken("#005aff", 0.3),
      contrastText: "#fff",
    },
    secondary: {
      main: "#F9302C",
      light: MUI.lighten("#F9302C", 0.3),
      dark: MUI.darken("#F9302C", 0.3),
      contrastText: "#fff",
    },
    divider: MUI.colors.grey[400],
    error: {
      main: "#F9302C",
      light: MUI.lighten("#F9302C", 0.3),
      dark: MUI.darken("#F9302C", 0.3),
    },
    text: { primary: "#444", secondary: "#00000099" },
    surface: { rug: "#F0F1F2" },
    foreground: { muted: "#00000099" },
  } as const

  const typography = {
    fontFamily: ["Noto Sans JP", "HiraginoSans", "sans-serif", "-apple-system"].join(","),
    h1: {
      fontSize: 64,
      fontWeight: 700,
      letterSpacing: 1,
    },
    h2: {
      fontSize: 48,
      fontWeight: 700,
      letterSpacing: 1,
    },
    h3: {
      fontSize: 32,
      fontWeight: 700,
      letterSpacing: 1,
    },
    h4: {
      fontSize: 24,
      fontWeight: 700,
      letterSpacing: 1,
    },
    h5: {
      fontSize: 18,
      fontWeight: 700,
      letterSpacing: 1,
    },
    h6: {
      fontSize: 14,
      fontWeight: 700,
      letterSpacing: 1,
    },
  }

  const breakpoints = {
    values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536, mobile: 350, bigMobile: 450, tablet: 650, desktop: 900 },
  }

  const themeOptions: MUI.ThemeOptions = {
    palette,
    typography,
    breakpoints,
    components: {
      MuiButton: {
        styleOverrides: {
          root: { textTransform: "none", whiteSpace: "nowrap" },
          outlined: ({ theme }) => ({ fontWeight: "bold", borderColor: theme.palette.divider }),
          colorInherit: ({ theme }) => ({ color: theme.palette.text.secondary }),
        },
      },
      MuiTab: { styleOverrides: { root: { fontWeight: "bold" } } },
      MuiListItem: { styleOverrides: { padding: { padding: "4px 4px" } } },
      MuiListItemButton: { styleOverrides: { root: { padding: "4px 4px" } } },
      MuiListItemAvatar: { styleOverrides: { root: { minWidth: 56, display: "flex", justifyContent: "center" } } },
      MuiListItemIcon: { styleOverrides: { root: { minWidth: 56, display: "flex", justifyContent: "center" } } },
      MuiListItemText: {
        styleOverrides: {
          primary: { whiteSpace: "nowrap", fontSize: "0.9rem", fontWeight: "bold" },
          secondary: { whiteSpace: "nowrap", fontSize: "0.8rem" },
        },
      },
      MuiDialog: { styleOverrides: { paper: { borderRadius: 6, padding: 20 } } },
    },
  }

  const theme = MUI.responsiveFontSizes(MUI.createTheme(themeOptions))

  return (
    <MUI.StyledEngineProvider injectFirst>
      <MUI.ThemeProvider theme={theme}>
        <MUI.CssBaseline />
        <MUI.Stack width={"100dvw"} height={"100dvh"}>
          {children}
        </MUI.Stack>
      </MUI.ThemeProvider>
    </MUI.StyledEngineProvider>
  )
}
