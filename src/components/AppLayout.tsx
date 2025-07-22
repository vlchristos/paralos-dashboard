import { Box, Toolbar } from "@mui/material";
import AppDrawer from "./AppDrawer";
import AppHeader from "./AppHeader";

type LayoutProps = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: LayoutProps) {
  return (
    <Box display="flex">
      <AppHeader />
      <AppDrawer />
      <Box
        sx={{
          flexGrow: 1,
          p: 3,
          overflowX: { xs: "hidden", md: "initial" },
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
