import AppContent from "./components/AppContent";
import AppDrawer from "./components/AppDrawer";
import CssBaseline from "@mui/material/CssBaseline";
import { Box, useMediaQuery } from "@mui/material";
import { ThemeProvider, type PaletteMode } from "@mui/material/styles";
import { useEffect, useMemo, useState } from "react";
import { theme } from "./themeOptions";
import AppHeader from "./components/AppHeader";

function App() {
  // TODO: Uncomment when the theme mode is implemented in the store
  // const dispatch = useAppDispatch();
  // const darkModePreference = useAppSelector((state) => state.editor.themeMode);
  const darkModePreference = "auto"; // Placeholder for dark mode preference, replace with actual state when implemented
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
    // TODO: Uncomment when the theme mode is implemented in the store
    // dispatch(setSystemThemeMode(prefersDarkMode ? "dark" : "light"));
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
