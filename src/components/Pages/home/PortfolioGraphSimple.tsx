import { useAppSelector } from "../../../store";
import { selectActivePortfolioHistory } from "../../../store/portfolios/selectors";
import { ChartContainer } from "@mui/x-charts/ChartContainer";
import {
  LinePlot,
  MarkPlot,
  lineElementClasses,
} from "@mui/x-charts/LineChart";
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
    <ChartContainer
      height={300}
      series={[
        {
          showMark: false,
          type: "line",
          data: history.map((h) => h.total_value),
        },
      ]}
      xAxis={[
        {
          scaleType: "point",
          data: history.map((h) => new Date(h.date)),
          position: "none",
        },
      ]}
      yAxis={[{ position: "none" }]}
      sx={{
        [`& .${lineElementClasses.root}`]: {
          strokeWidth: 2,
        },
      }}
      disableAxisListener
    >
      <LinePlot />
      <MarkPlot />
    </ChartContainer>
  );
}
