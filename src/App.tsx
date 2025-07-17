import CssBaseline from "@mui/material/CssBaseline";
import { useMediaQuery } from "@mui/material";
import { ThemeProvider, type PaletteMode } from "@mui/material/styles";
import { useEffect, useMemo, useState } from "react";
import { theme } from "./themeOptions";
import { useAppDispatch, useAppSelector } from "./store";
import { RouterProvider } from "react-router";
import { router } from "./AppRouting";
import { getPortfolios } from "./store/portfolios/portfoliosSlice";

function App() {
  const dispatch = useAppDispatch();
  const darkModePreference = useAppSelector(
    (state) => state.global.systemThemeMode,
  );
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [darkMode, setDarkMode] = useState(prefersDarkMode ? "dark" : "light");

  useEffect(() => {
    if (!darkModePreference) {
      setDarkMode(prefersDarkMode ? "dark" : "light");
      return;
    }
    if (darkModePreference !== "auto") {
      setDarkMode(darkModePreference);
    } else {
      setDarkMode(prefersDarkMode ? "dark" : "light");
    }
  }, [darkModePreference, prefersDarkMode]);

  useEffect(() => {
    dispatch(getPortfolios());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const paralosTheme = useMemo(
    () => theme(darkMode as PaletteMode),
    [darkMode],
  );

  return (
    <ThemeProvider theme={paralosTheme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
