import { Box, Paper, Typography } from "@mui/material";
import AppLayout from "../../AppLayout";
import { useAppDispatch, useAppSelector } from "../../../store";
import { useEffect } from "react";
import {
  getTodayStocks,
  setSearchTerm,
  setSelectedSector,
} from "../../../store/today/todaySlice";
import StocksTable from "../../StocksTable";
import {
  selectFilteredStocks,
  selectSectorsByActivePortfolio,
  selectActiveSector,
} from "../../../store/today/selectors";
import type { Stock } from "../../../types/today/today";
import PortfolioDetails from "./PortfolioDetails";
import StocksFilters from "../../StocksTable/StocksFilters";

export default function Home() {
  const dispatch = useAppDispatch();
  const selectedSector: string = useAppSelector(selectActiveSector);
  const filteredStocks: Stock[] | undefined =
    useAppSelector(selectFilteredStocks);
  const sectors = useAppSelector(selectSectorsByActivePortfolio);
  const searchTerm: string = useAppSelector((state) => state.today.searchTerm);

  function handleSectorChange(sectorId: string) {
    dispatch(setSelectedSector(sectorId));
  }

  function handleSearchChange(searchTerm: string) {
    dispatch(setSearchTerm(searchTerm));
  }

  function handleClearSearch() {
    dispatch(setSearchTerm(""));
  }

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
            <StocksFilters
              sectors={sectors}
              searchTerm={searchTerm}
              selectedSector={selectedSector}
              handleSearchChange={handleSearchChange}
              handleSectorChange={handleSectorChange}
              handleClearSearch={handleClearSearch}
            />
          </Box>
          <Box width="100%" overflow="hidden" component={Paper} p={2}>
            <StocksTable stocks={filteredStocks} />
          </Box>
        </>
      )}
    </AppLayout>
  );
}
