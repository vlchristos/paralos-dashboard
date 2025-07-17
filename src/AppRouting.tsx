import { createBrowserRouter } from "react-router";
import Home from "./components/Pages/home";
import Stocks from "./components/Pages/stocks";
import AppLayout from "./components/AppLayout";

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
    Component: () => <AppLayout>Page Not Found</AppLayout>, // Fallback for unmatched routes
  },
]);
