import { AppBar, Box, Toolbar } from "@mui/material";
import ParalosLogo from "../ParalosLogo";
import SidebarToggleButton from "./SidebarToggleButton";
import ThemeToggleButton from "./ThemeToggleButton";

export default function AppHeader() {
  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar sx={{ paddingLeft: "10px !important" }}>
        <Box display="flex" alignItems="center">
          <Box sx={{ minWidth: 56 }}>
            <SidebarToggleButton />
          </Box>
          <ParalosLogo width={124} />
        </Box>
        <Box marginLeft="auto">
          <ThemeToggleButton />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
