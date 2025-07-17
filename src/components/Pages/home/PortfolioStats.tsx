import { Box, Typography } from "@mui/material";
import { useAppSelector } from "../../../store";
import { selectActivePortfolioStats } from "../../../store/portfolios/selectors";

export default function PortfolioStats() {
  const selectedPortfolioStats = useAppSelector(selectActivePortfolioStats);

  function isNegative(value?: number): boolean {
    return value !== undefined && value < 0;
  }

  if (!selectedPortfolioStats) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height={100}
      >
        <Typography variant="body2" color="textSecondary">
          No portfolio stats available
        </Typography>
      </Box>
    );
  }

  return (
    <Box display="flex" gap={5} flexWrap="wrap">
      <Box>
        <Typography variant="subtitle2" color="textSecondary">
          Total value
        </Typography>
        <Typography variant="h6">
          {selectedPortfolioStats ? selectedPortfolioStats.totalValue : "–"}
        </Typography>
      </Box>
      <Box>
        <Typography variant="subtitle2" color="textSecondary">
          Total P/L
        </Typography>
        <Typography variant="h6">
          {selectedPortfolioStats ? selectedPortfolioStats.totalPnl : "–"}
        </Typography>
      </Box>
      <Box>
        <Typography variant="subtitle2" color="textSecondary">
          Daily P/L
        </Typography>
        <Typography variant="h6">
          {selectedPortfolioStats ? selectedPortfolioStats.dailyPnl : "–"}
        </Typography>
      </Box>
    </Box>
  );
}
