import { Avatar, Box, CircularProgress, Typography } from "@mui/material";
import type { Stock } from "../../types/today/today";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

type StocksTableProps = {
  stocks: Stock[];
  noData?: boolean;
  onRowClick?: (symbol: string) => void;
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

export default function StocksTable({
  stocks,
  noData,
  onRowClick,
}: StocksTableProps) {
  function handleRowClick(symbol: string) {
    if (onRowClick) {
      onRowClick(symbol);
    }
  }

  const rows = stocks.map((stock) =>
    createData(
      stock.symbol,
      stock.quantity,
      Number(stock.price.toFixed(2)),
      Number(stock.change_pct.toFixed(2)),
      Number(stock.daily_pnl.toFixed(2)),
    ),
  );

  if (noData) {
    return (
      <Box
        height={300}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="body1" color="textSecondary">
          No data available
        </Typography>
      </Box>
    );
  }

  if (rows.length === 0) {
    return (
      <Box
        height={300}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Symbol</TableCell>
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
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                "&:hover": {
                  backgroundColor: onRowClick && "rgba(0, 0, 0, 0.04)",
                  cursor: onRowClick ? "pointer" : "default",
                },
              }}
              onClick={() => handleRowClick(row.symbol)}
            >
              <TableCell component="th" scope="row">
                <Box
                  display="flex"
                  alignItems={{ xs: "start", md: "center" }}
                  gap={1}
                >
                  <Avatar
                    alt={row.symbol}
                    src={`https://img.logo.dev/ticker/${row.symbol}?token=pk_Tx10ZcjSRomUlLolhTAi0w&size=48&retina=true`}
                    sx={{
                      width: { xs: 24, md: 48 },
                      height: { xs: 24, md: 48 },
                      marginRight: 1,
                    }}
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
