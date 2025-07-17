import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { useAppDispatch, useAppSelector } from "../../store";
import { toggleMainMenu } from "../../store/global/globalSlice";

export default function SidebarToggleButton() {
  const dispatch = useAppDispatch();
  const mainMenuOpen = useAppSelector((state) => state.global.mainMenuOpen);

  function handleToggle() {
    dispatch(toggleMainMenu());
  }

  return (
    <IconButton onClick={handleToggle} color="inherit">
      {mainMenuOpen ? <MenuOpenIcon /> : <MenuIcon />}
    </IconButton>
  );
}
