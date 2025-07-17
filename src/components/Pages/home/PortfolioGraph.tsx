import { LineChart } from "@mui/x-charts/LineChart";
import { useAppSelector } from "../../../store";
import {
  selectActivePortfolio,
  selectPortfolioItems,
} from "../../../store/portfolios/selectors";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";

type Series = {
  data: number[];
  label: string;
  showMark: boolean;
};

export default function PorfolioGraph() {
  const theme = useTheme();
  const portfolios = useAppSelector(selectPortfolioItems);
  const selectedPortfolio = useAppSelector(selectActivePortfolio);
  const [dataSeries, setDataSeries] = useState<Series[]>([]);

  useEffect(() => {
    if (!portfolios || portfolios.length === 0 || !selectedPortfolio) {
      return;
    }

    const series: Series[] = [];

    series.push({
      data: selectedPortfolio?.history.map((h) => h.total_value) || [],
      label: selectedPortfolio?.name || "Selected Portfolio",
      showMark: false,
    });

    const rest = portfolios.filter((p) => p.id !== selectedPortfolio.id);

    rest.forEach((p) => {
      series.push({
        data: p.history.map((h) => h.total_value),
        label: p.name,
        showMark: false,
      });
    });

    setDataSeries(series);
  }, [portfolios, selectedPortfolio]);

  if (portfolios.length === 0 || portfolios[0].history.length === 0) {
    return null; // No data to display
  }

  return (
    <LineChart
      height={300}
      series={dataSeries}
      xAxis={[
        {
          scaleType: "time",
          data: portfolios[0].history?.map((h) => new Date(h.date)),
          valueFormatter: (value) => {
            return new Intl.DateTimeFormat("en-US", {
              month: "short",
              day: "numeric",
            }).format(value);
          },
        },
      ]}
      yAxis={[{ position: "none" }]}
      colors={[
        theme.palette.primary.main,
        theme.palette.action.disabled,
        theme.palette.action.disabledBackground,
      ]}
    />
  );
}
