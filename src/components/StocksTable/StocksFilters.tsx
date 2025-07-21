import {
  Box,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  type SelectChangeEvent,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  selectSectorsByActivePortfolio,
  selectSelectedSector,
} from "../../store/today/selectors";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import type { Sector } from "../../types/today/today";
import { setSearchTerm, setSelectedSector } from "../../store/today/todaySlice";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { debounce } from "@mui/material";
import { useEffect, useState } from "react";

const debouncedSearch = debounce((dispatch, searchTerm: string) => {
  dispatch(setSearchTerm(searchTerm.trim()));
}, 300);

export default function StocksFilters() {
  const dispatch = useAppDispatch();
  const selectedSector: string = useAppSelector(selectSelectedSector);
  const sectors: Sector[] = useAppSelector(selectSectorsByActivePortfolio);
  const searchTerm: string = useAppSelector((state) => state.today.searchTerm);
  const [term, setTerm] = useState(searchTerm);

  function handleSectorChange(event: SelectChangeEvent) {
    const sectorId = event.target.value;
    dispatch(setSelectedSector(sectorId));
  }

  function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    const searchTerm = event.target.value;
    setTerm(searchTerm);
  }

  function handleClearSearch() {
    setTerm("");
    dispatch(setSearchTerm(""));
  }

  useEffect(() => {
    if (term !== "") {
      debouncedSearch(dispatch, term);
    }
  }, [term]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box
      display="flex"
      flexDirection={{ xs: "column", sm: "row" }}
      gap={2}
      width={{ xs: "100%", sm: "auto" }}
    >
      <FormControl fullWidth>
        <TextField
          fullWidth
          id="search"
          placeholder="Search stocks"
          variant="outlined"
          onChange={handleSearchChange}
          value={term}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchOutlinedIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  {searchTerm && (
                    <CloseOutlinedIcon
                      onClick={handleClearSearch}
                      style={{ cursor: "pointer" }}
                    />
                  )}
                </InputAdornment>
              ),
            },
          }}
        />
      </FormControl>
      {sectors.length > 0 && (
        <FormControl fullWidth sx={{ minWidth: 140 }}>
          <InputLabel id="sector-select">Sector</InputLabel>
          <Select
            labelId="sector-select"
            id="sector-select"
            value={selectedSector}
            label="Sector"
            onChange={handleSectorChange}
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
  );
}
