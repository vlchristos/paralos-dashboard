import { Avatar, Box, Typography } from "@mui/material";
import type { TodayStock } from "../../types/today/today";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

type StocksTableProps = {
  stocks: TodayStock[];
};

function createData(
  symbol: string,
  quantity: number,
  price: number,
  change: number,
  pnl: number,
) {
  return {
    symbol,
    quantity,
    price,
    change,
    pnl,
  };
}

export default function StocksTable({ stocks }: StocksTableProps) {
  const rows = stocks.map((stock) =>
    createData(
      stock.symbol,
      stock.quantity,
      Number(stock.price.toFixed(2)),
      Number(stock.change_pct.toFixed(2)),
      Number(stock.daily_pnl.toFixed(2)),
    ),
  );

  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Change</TableCell>
            <TableCell align="right">P/L</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.symbol}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Box display="flex" alignItems="center" gap={1}>
                  <Avatar
                    alt={row.symbol}
                    src={`https://img.logo.dev/ticker/${row.symbol}?token=pk_Tx10ZcjSRomUlLolhTAi0w&size=48&retina=true`}
                    sx={{ width: 48, height: 48, marginRight: 1 }}
                  />
                  <Box>
                    <Typography variant="body1">{row.symbol}</Typography>
                    <Typography variant="caption" color="textSecondary">
                      {stocks.find((stock) => stock.symbol === row.symbol)
                        ?.name || ""}
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell align="right">
                <Typography color="textSecondary">{row.quantity}</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography color="textSecondary">{row.price}</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography
                  variant="body2"
                  color={row.change < 0 ? "error.main" : "success.main"}
                >
                  {row.change}&nbsp;<Typography variant="caption"></Typography>
                  {row.change < 0 ? "▼" : "▲"}
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography
                  variant="body2"
                  color={row.pnl < 0 ? "error.main" : "success.main"}
                >
                  {row.pnl}&nbsp;{row.pnl < 0 ? "▼" : "▲"}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
