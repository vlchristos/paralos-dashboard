import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
  type SelectChangeEvent,
} from "@mui/material";
import AppLayout from "../../AppLayout";
import { useAppDispatch, useAppSelector } from "../../../store";
import { useEffect, useState } from "react";
import { getTodayStocks } from "../../../store/today/todaySlice";
import StocksTable from "../../StocksTable";
import {
  selectActivePortfolioStocks,
  selectSectorsByActivePortfolio,
} from "../../../store/today/selectors";
import type { Sector, TodayStock } from "../../../types/today/today";
import PortfolioDetails from "./PortfolioDetails";

export default function Home() {
  const dispatch = useAppDispatch();
  const selectedPortfolioStocks: TodayStock[] | undefined = useAppSelector(
    selectActivePortfolioStocks,
  );
  const sectors: Sector[] = useAppSelector(selectSectorsByActivePortfolio);
  const [selectedSector, setSelectedSector] = useState<string>("");

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedSector(event.target.value as string);
  };

  useEffect(() => {
    console.log("selectedSector:>>", selectedSector);
  }, [selectedSector]);

  useEffect(() => {
    dispatch(getTodayStocks());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AppLayout>
      <Box mb={5}>
        <PortfolioDetails />
      </Box>
      {selectedPortfolioStocks && (
        <>
          <Box
            display="flex"
            mb={2}
            alignItems="center"
            justifyContent="space-between"
            width="100%"
          >
            <Typography variant="h5" gutterBottom>
              Stocks
            </Typography>
            {sectors.length > 0 && (
              <FormControl sx={{ minWidth: 120, width: 200 }}>
                <InputLabel id="sector-select">Sector</InputLabel>
                <Select
                  labelId="sector-select"
                  id="sector-select"
                  value={selectedSector}
                  label="Sector"
                  onChange={handleChange}
                >
                  <MenuItem value="">All</MenuItem>
                  {sectors.map((sector) => (
                    <MenuItem key={sector.id} value={sector.id}>
                      {sector.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </Box>
          <Box component={Paper} p={2}>
            <StocksTable stocks={selectedPortfolioStocks} />
          </Box>
        </>
      )}
    </AppLayout>
  );
}
