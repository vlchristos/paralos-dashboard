import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useAppSelector } from "../../../../store";
import { selectActiveStockDetails } from "../../../../store/stocks/selectors";
import SingleStockGraph from "./SingleStockGraph";
import PeriodSelector from "./PeriodSelector";

type SingleStockDialogProps = {
  open: boolean;
  handleClose: () => void;
};

export default function SingleStockDialog({
  open,
  handleClose,
}: SingleStockDialogProps) {
  const selectedStock = useAppSelector(selectActiveStockDetails);

  function handleCloseDialog() {
    handleClose();
  }

  if (!selectedStock) {
    return null; // or handle the case where no stock is selected
  }

  return (
    <Dialog
      open={open}
      keepMounted
      onClose={handleClose}
      aria-describedby="stock-dialog-description"
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>
        <Box display="flex" alignItems="center" gap={1}>
          <Avatar
            alt={selectedStock.symbol}
            src={`https://img.logo.dev/ticker/${selectedStock.symbol}?token=pk_Tx10ZcjSRomUlLolhTAi0w&size=48&retina=true`}
            sx={{
              width: { xs: 24, md: 48 },
              height: { xs: 24, md: 48 },
              marginRight: 1,
            }}
          />
          {selectedStock.symbol}
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box display="flex" justifyContent="space-between" gap={1} mb={2}>
          <DialogContentText id="stock-dialog-description">
            {selectedStock.name} – {selectedStock.sector}
          </DialogContentText>
          <PeriodSelector />
        </Box>
        <SingleStockGraph />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
