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
  useMediaQuery,
} from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ShowChartOutlinedIcon from "@mui/icons-material/ShowChartOutlined";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import { useAppDispatch, useAppSelector } from "../store";
import { Link } from "react-router";
import { toggleMainMenu } from "../store/global/globalSlice";

const DRAWER_WIDTH = 240;
const MENU_ITEMS = [
  { text: "Stocks", icon: <ShowChartOutlinedIcon />, url: "/stocks" },
  {
    text: "Trades",
    icon: <BusinessCenterOutlinedIcon />,
    url: "/portfolio",
  },
];

export default function AppDrawer() {
  const dispatch = useAppDispatch();
  const isMobile = useMediaQuery("(max-width: 720px)");
  const drawerOpen = useAppSelector((state) => state.global.mainMenuOpen);

  function handleDrawerClose() {
    dispatch(toggleMainMenu());
  }

  return (
    <Drawer
      open={drawerOpen}
      onClose={handleDrawerClose}
      variant={isMobile ? "temporary" : "permanent"}
      sx={{
        width: drawerOpen ? DRAWER_WIDTH : 0,
        flexShrink: 0,
        transition: "width 0.3s ease-in-out",
        [`& .MuiDrawer-paper`]: {
          width: drawerOpen ? DRAWER_WIDTH : 0,
          transition: "width 0.3s ease-in-out",
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/">
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
              <ListItemButton component={Link} to={item.url}>
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
