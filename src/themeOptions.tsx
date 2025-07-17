import {
  createTheme,
  responsiveFontSizes,
  type PaletteMode,
} from "@mui/material/styles";

const themeOptions = (mode: PaletteMode) =>
  createTheme({
    palette: {
      mode: mode,
      ...(mode === "light"
        ? {
            primary: {
              main: "#1D2554",
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
