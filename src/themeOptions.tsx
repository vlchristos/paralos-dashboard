import {
  createTheme,
  responsiveFontSizes,
  type PaletteMode,
} from "@mui/material/styles";

const themeOptions = (mode: PaletteMode) =>
  createTheme({
    typography: {
      fontFamily: ["Lato", "Helvetica", "Arial", "sans-serif"].join(","),
    },
    palette: {
      mode: mode,
      ...(mode === "light"
        ? {
            primary: {
              main: "#1D2554",
            },
            secondary: {
              main: "#6E828C",
            },
            warning: {
              main: "#e2b26c",
            },
            error: {
              main: "#ef5b50",
            },
            divider: "rgba(0,0,0,0.08)",
          }
        : {
            primary: {
              main: "#D0F0C0D8",
            },
            secondary: {
              main: "#8DA7B4",
            },
            warning: {
              main: "#e2b26c",
            },
            error: {
              main: "#ef5b50",
            },
            divider: "rgba(255,255,255,0.08)",
          }),
    },
  });

export const theme = (mode: PaletteMode) =>
  responsiveFontSizes(themeOptions(mode));
