import { createBrowserRouter } from "react-router";
import Home from "./components/Pages/home";
import Stocks from "./components/Pages/stocks";
import AppLayout from "./components/AppLayout";
import { Box, Typography } from "@mui/material";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/stocks",
    Component: Stocks,
  },
  {
    path: "*",
    Component: () => (
      <AppLayout>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100svh"
          width="100%"
        >
          <Typography variant="h6" color="textSecondary">
            Coming soon
          </Typography>
        </Box>
      </AppLayout>
    ), // Fallback for unmatched routes
  },
]);
