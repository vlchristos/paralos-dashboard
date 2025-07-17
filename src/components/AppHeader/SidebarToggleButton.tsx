import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useAppDispatch } from "../../store";
import { toggleMainMenu } from "../../store/global/globalSlice";

export default function SidebarToggleButton() {
  const dispatch = useAppDispatch();

  function handleToggle() {
    dispatch(toggleMainMenu());
  }

  return (
    <IconButton onClick={handleToggle}>
      <MenuIcon color="inherit" />
    </IconButton>
  );
}
