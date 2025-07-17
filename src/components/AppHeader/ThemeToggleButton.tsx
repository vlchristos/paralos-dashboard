import { IconButton } from "@mui/material";
import Brightness4OutlinedIcon from "@mui/icons-material/Brightness4Outlined";
import { useAppDispatch, useAppSelector } from "../../store";
import { setSystemThemeMode } from "../../store/global/globalSlice";

export default function ThemeToggleButton() {
  const dispatch = useAppDispatch();
  const darkModePreference = useAppSelector(
    (state) => state.global.systemThemeMode,
  );

  function handleToggleTheme() {
    if (darkModePreference === "dark" || darkModePreference === "auto") {
      dispatch(setSystemThemeMode("light"));
      return;
    }
    dispatch(setSystemThemeMode("dark"));
  }

  return (
    <IconButton onClick={handleToggleTheme} color="inherit">
      <Brightness4OutlinedIcon />
    </IconButton>
  );
}
