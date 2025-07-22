import {
  Box,
  debounce,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  type SelectChangeEvent,
} from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import type { Sector } from "../../types/today/today";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useEffect, useState } from "react";

export type StocksFiltersProps = {
  sectors: Sector[];
  selectedSector: string;
  searchTerm: string;
  handleSectorChange: (sectorId: string) => void;
  handleSearchChange: (searchTerm: string) => void;
  handleClearSearch: () => void;
};

const debouncedSearch = debounce((handleSearchChange, searchTerm: string) => {
  handleSearchChange(searchTerm.trim());
}, 300);

export default function StocksFilters({
  sectors,
  selectedSector,
  searchTerm,
  handleSearchChange,
  handleSectorChange,
  handleClearSearch,
}: StocksFiltersProps) {
  const [term, setTerm] = useState(searchTerm);

  function onSectorChange(event: SelectChangeEvent) {
    const sectorId = event.target.value;
    handleSectorChange(sectorId);
  }

  function onSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    const searchTerm = event.target.value;
    setTerm(searchTerm);
  }

  function onClearSearch() {
    setTerm("");
    handleClearSearch();
  }

  useEffect(() => {
    debouncedSearch(handleSearchChange, term);
  }, [term]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box
      display="flex"
      flexDirection={{ xs: "column", md: "row" }}
      gap={2}
      width={{ xs: "100%", md: "auto" }}
    >
      <FormControl sx={{ width: { xs: "100%", md: 300 } }}>
        <TextField
          fullWidth
          id="search"
          placeholder="Search stocks"
          variant="outlined"
          onChange={onSearchChange}
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
                  {term && (
                    <CloseOutlinedIcon
                      onClick={onClearSearch}
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
        <FormControl sx={{ width: { xs: "100%", md: 200 } }}>
          <InputLabel id="sector-select">Sector</InputLabel>
          <Select
            fullWidth
            labelId="sector-select"
            id="sector-select"
            value={selectedSector}
            label="Sector"
            onChange={onSectorChange}
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
