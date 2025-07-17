import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ShowChartOutlinedIcon from "@mui/icons-material/ShowChartOutlined";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import { useAppSelector } from "../store";

const DRAWER_WIDTH = 240;
const MENU_ITEMS = [
  { text: "Stocks", icon: <ShowChartOutlinedIcon /> },
  { text: "Portfolio", icon: <BusinessCenterOutlinedIcon /> },
];

export default function AppDrawer() {
  const drawerOpen = useAppSelector((state) => state.global.mainMenuOpen);
  return (
    <Drawer
      open={drawerOpen}
      variant="persistent"
      sx={{
        width: drawerOpen ? DRAWER_WIDTH : 0,
        flexShrink: 0,
        transition: "width 0.3s ease-in-out",
        [`& .MuiDrawer-paper`]: {
          width: DRAWER_WIDTH,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <HomeOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <List>
          {MENU_ITEMS.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}
