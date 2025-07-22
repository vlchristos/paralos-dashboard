import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../store";
import {
  PERIODS,
  setPeriod,
  type Period,
} from "../../../../store/stocks/stocksSlice";

export default function PeriodSelector() {
  const dispatch = useAppDispatch();
  const period: Period = useAppSelector((state) => state.stocks.periodMonths);

  const handleChange = (
    _event: React.MouseEvent<HTMLElement>,
    newPeriod: string,
  ) => {
    dispatch(setPeriod(newPeriod as Period));
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={period}
      exclusive
      onChange={handleChange}
      aria-label="Period Selector"
      size="small"
    >
      {PERIODS.map((period) => (
        <ToggleButton key={period.value} value={period.value}>
          {period.label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
