import { Box, Paper, Typography } from "@mui/material";
import AppLayout from "../../AppLayout";
import { useAppDispatch, useAppSelector } from "../../../store";
import { useEffect } from "react";
import { getTodayStocks } from "../../../store/today/todaySlice";
import StocksTable from "../../StocksTable";
import { selectFilteredStocks } from "../../../store/today/selectors";
import type { TodayStock } from "../../../types/today/today";
import PortfolioDetails from "./PortfolioDetails";
import StocksFilters from "../../StocksTable/StocksFilters";

export default function Home() {
  const dispatch = useAppDispatch();
  const filteredStocks: TodayStock[] | undefined =
    useAppSelector(selectFilteredStocks);

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
          <Box
            display="flex"
            mb={2}
            alignItems={{ xs: "flex-start", sm: "end" }}
            justifyContent="space-between"
            width="100%"
            sx={{ flexDirection: { xs: "column", sm: "row" } }}
          >
            <Typography variant="h5" gutterBottom>
              Stocks
            </Typography>
            <StocksFilters />
          </Box>
          <Box component={Paper} p={2}>
            <StocksTable stocks={filteredStocks} />
          </Box>
        </>
      )}
    </AppLayout>
  );
}
