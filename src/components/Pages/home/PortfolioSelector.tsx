import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import { useAppDispatch, useAppSelector } from "../../../store";
import { setSelectedPortfolioId } from "../../../store/portfolios/portfoliosSlice";

export default function PortfolioSelector() {
  const dispatch = useAppDispatch();
  const selectedPortfolioId = useAppSelector(
    (state) => state.portfolios.selectedPortfolioId,
  );
  const portfolioItems = useAppSelector(
    (state) => state.portfolios.portfolioItems,
  );

  const handleChange = (event: SelectChangeEvent) => {
    const portfolioId = event.target.value as string;

    if (portfolioId === "") {
      // If "None" is selected, set the portfolioId to null
      dispatch(setSelectedPortfolioId(null));
      return;
    }

    dispatch(setSelectedPortfolioId(portfolioId));
  };

  return (
    <Box sx={{ minWidth: 200 }}>
      <FormControl fullWidth>
        <InputLabel id="portfolio-select">Portfolio</InputLabel>
        <Select
          size="small"
          labelId="portfolio-select"
          id="portfolio-select"
          value={selectedPortfolioId || "All"}
          label="Portfolio"
          onChange={handleChange}
        >
          {portfolioItems.map((portfolio) => (
            <MenuItem key={portfolio.id} value={portfolio.id}>
              {portfolio.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
