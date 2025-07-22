import { LineChart } from "@mui/x-charts";
import { useAppSelector } from "../../../../store";
import { selectActiveStockDataByPeriod } from "../../../../store/stocks/selectors";
import { Box, CircularProgress } from "@mui/material";

export default function SingleStockGraph() {
  const stockData = useAppSelector(selectActiveStockDataByPeriod);
  const xAxisLabel = stockData.map((data) => {
    return new Date(data.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  });

  if (stockData.length === 0) {
    return (
      <Box
        height={500}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <LineChart
      height={500}
      series={[
        {
          data: stockData.map((data) => data.close),
          showMark: false,
        },
      ]}
      xAxis={[{ scaleType: "point", data: xAxisLabel }]}
      yAxis={[
        { scaleType: "linear", data: stockData.map((data) => data.close) },
      ]}
    />
  );
}
