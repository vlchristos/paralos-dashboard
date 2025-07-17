import AppContent from "./components/AppContent";
import AppDrawer from "./components/AppDrawer";
import CssBaseline from "@mui/material/CssBaseline";
import { Box, useMediaQuery } from "@mui/material";
import { ThemeProvider, type PaletteMode } from "@mui/material/styles";
import { useEffect, useMemo, useState } from "react";
import { theme } from "./themeOptions";
import AppHeader from "./components/AppHeader";
import { useAppSelector } from "./store";

function App() {
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
  }, [darkModePreference, prefersDarkMode]); // eslint-disable-line react-hooks/exhaustive-deps

  const paralosTheme = useMemo(
    () => theme(darkMode as PaletteMode),
    [darkMode],
  );

  return (
    <ThemeProvider theme={paralosTheme}>
      <Box display="flex">
        <CssBaseline />
        <AppHeader />
        <AppDrawer />
        <AppContent />
      </Box>
    </ThemeProvider>
  );
}

export default App;
