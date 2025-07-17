import { Typography } from "@mui/material";
import Portfolios from "./Portfolios";
import AppLayout from "../../AppLayout";

export default function Home() {
  return (
    <AppLayout>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to the Home Page
      </Typography>
      <Portfolios />
    </AppLayout>
  );
}
