import { Box, Paper, Typography } from "@mui/material";
import AppLayout from "../../AppLayout";
import { useAppDispatch, useAppSelector } from "../../../store";
import { useEffect } from "react";
import { getTodayStocks } from "../../../store/today/todaySlice";
import StocksTable from "../../StocksTable";
import { selectActivePortfolioStocks } from "../../../store/today/selectors";
import type { TodayStock } from "../../../types/today/today";
import PortfolioDetails from "./PortfolioDetails";

export default function Home() {
  const dispatch = useAppDispatch();
  const filteredStocks: TodayStock[] | undefined = useAppSelector(
    selectActivePortfolioStocks,
  );

  useEffect(() => {
    dispatch(getTodayStocks());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AppLayout>
      <Box mb={5}>
        <PortfolioDetails />
      </Box>
      {filteredStocks && (
        <>
          <Typography variant="h5" gutterBottom>
            Stocks
          </Typography>
          <Box component={Paper} p={2}>
            <StocksTable stocks={filteredStocks} />
          </Box>
        </>
      )}
    </AppLayout>
  );
}
