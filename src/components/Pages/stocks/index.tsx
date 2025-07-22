import { Box, Paper, Typography } from "@mui/material";
import AppLayout from "../../AppLayout";
import { useAppDispatch, useAppSelector } from "../../../store";
import { useEffect, useMemo, useState } from "react";
import StocksTable from "../../StocksTable";
import type { Stock } from "../../../types/today/today";
import StocksFilters from "../../StocksTable/StocksFilters";
import {
  clearSelectedStockData,
  getAvailableStocks,
  setSearchTerm,
  setSelectedSector,
  setSelectedStock,
} from "../../../store/stocks/stocksSlice";
import {
  selectFilteredStocks,
  selectSectorsFromAvailableStocks,
} from "../../../store/stocks/selectors";
import SingleStockDialog from "./Modal/SingleStockDialog";

export default function Stocks() {
  const dispatch = useAppDispatch();
  const filteredStocks: Stock[] | undefined =
    useAppSelector(selectFilteredStocks);
  const sectors = useAppSelector(selectSectorsFromAvailableStocks);
  const selectedSector: string = useAppSelector(
    (state) => state.stocks.selectedSector,
  );
  const searchTerm: string = useAppSelector((state) => state.stocks.searchTerm);
  const [modalOpen, setModalOpen] = useState(false);

  function handleSectorChange(sectorId: string) {
    dispatch(setSelectedSector(sectorId));
  }

  function handleSearchChange(searchTerm: string) {
    dispatch(setSearchTerm(searchTerm));
  }

  function handleClearSearch() {
    dispatch(setSearchTerm(""));
  }

  function handleRowClick(symbol: string) {
    dispatch(setSelectedStock(symbol));
    setModalOpen(true);
  }

  function handleOnClose() {
    setModalOpen(false);
    dispatch(clearSelectedStockData());
  }

  const noData = useMemo(
    () =>
      filteredStocks &&
      filteredStocks.length === 0 &&
      (searchTerm !== "" || selectedSector !== ""),
    [filteredStocks, selectedSector, searchTerm],
  );

  useEffect(() => {
    dispatch(getAvailableStocks());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AppLayout>
      {filteredStocks && (
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: { xs: "flex-start", md: "end" },
              justifyContent: "space-between",
              py: 2,
              mx: -3,
              mb: 2,
              px: 3,
              backgroundColor: "background.paper",
              position: "sticky",
              top: 64,
              zIndex: 1,
            }}
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
            <StocksTable
              stocks={filteredStocks}
              noData={noData}
              onRowClick={handleRowClick}
            />
          </Box>
        </>
      )}
      <SingleStockDialog open={modalOpen} handleClose={handleOnClose} />
    </AppLayout>
  );
}
