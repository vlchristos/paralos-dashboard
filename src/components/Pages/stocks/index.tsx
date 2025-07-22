import { Box, Paper, Typography } from "@mui/material";
import AppLayout from "../../AppLayout";
import { useAppDispatch, useAppSelector } from "../../../store";
import { useEffect, useMemo } from "react";
import StocksTable from "../../StocksTable";
import type { Stock } from "../../../types/today/today";
import StocksFilters from "../../StocksTable/StocksFilters";
import {
  getAvailableStocks,
  setSearchTerm,
  setSelectedSector,
} from "../../../store/stocks/stocksSlice";
import {
  selectFilteredStocks,
  selectSectorsFromAvailableStocks,
} from "../../../store/stocks/selectors";

export default function Stocks() {
  const dispatch = useAppDispatch();
  const filteredStocks: Stock[] | undefined =
    useAppSelector(selectFilteredStocks);
  const sectors = useAppSelector(selectSectorsFromAvailableStocks);
  const selectedSector: string = useAppSelector(
    (state) => state.stocks.selectedSector,
  );
  const searchTerm: string = useAppSelector((state) => state.stocks.searchTerm);

  function handleSectorChange(sectorId: string) {
    dispatch(setSelectedSector(sectorId));
  }

  function handleSearchChange(searchTerm: string) {
    dispatch(setSearchTerm(searchTerm));
  }

  const noData = useMemo(
    () =>
      filteredStocks &&
      filteredStocks.length === 0 &&
      (searchTerm !== "" || selectedSector !== ""),
    [filteredStocks, selectedSector, searchTerm],
  );

  function handleClearSearch() {
    dispatch(setSearchTerm(""));
  }

  useEffect(() => {
    dispatch(getAvailableStocks());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AppLayout>
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
              handleSearchChange={handleSearchChange}
              handleSectorChange={handleSectorChange}
              handleClearSearch={handleClearSearch}
              selectedSector={selectedSector}
            />
          </Box>
          <Box width="100%" overflow="hidden" component={Paper} p={2}>
            <StocksTable stocks={filteredStocks} noData={noData} />
          </Box>
        </>
      )}
    </AppLayout>
  );
}
