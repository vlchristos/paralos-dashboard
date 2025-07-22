import { useAppSelector } from "../../../store";
import { selectActivePortfolioHistory } from "../../../store/portfolios/selectors";
import { LineChart } from "@mui/x-charts/LineChart";
import type { PortfolioHistoricData } from "../../../types/portfolio/portfolio";
import { Box, LinearProgress } from "@mui/material";

export default function PortfolioGraphSimple() {
  const history: PortfolioHistoricData[] = useAppSelector(
    selectActivePortfolioHistory,
  );

  if (!history || history.length === 0) {
    return (
      <Box
        height={300}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <LinearProgress sx={{ width: "80%" }} />
      </Box>
    );
  }

  return (
    <LineChart
      height={300}
      series={[
        {
          showMark: false,
          data: history.map((h) => h.total_value),
        },
      ]}
      xAxis={[
        {
          scaleType: "point",
          data: history.map((h) => new Date(h.date)),
          position: "none",
          valueFormatter: (value: Date) => {
            return new Intl.DateTimeFormat("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            }).format(value);
          },
        },
      ]}
      yAxis={[
        {
          position: "none",
          valueFormatter: (value: number) => {
            return new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(value);
          },
        },
      ]}
    />
  );
}
