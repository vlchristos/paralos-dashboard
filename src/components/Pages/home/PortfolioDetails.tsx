import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import { useAppSelector } from "../../../store";
import { selectActivePortfolio } from "../../../store/portfolios/selectors";
import PortfolioSelector from "./PortfolioSelector";
import PortfolioStats from "./PortfolioStats";
import PortfolioGraph from "./PortfolioGraph";
import PortfolioGraphSimple from "./PortfolioGraphSimple";
import { useState } from "react";

export default function PortfolioDetails() {
  const selectedPortfolio = useAppSelector(selectActivePortfolio);
  const [compare, setCompare] = useState(false);

  const handleCompare = () => {
    setCompare((prev) => !prev);
  };

  return (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="top">
          <Box>
            <Typography variant="subtitle2" color="textSecondary">
              Selected Portfolio
            </Typography>
            <Typography variant="h3" gutterBottom>
              {selectedPortfolio ? selectedPortfolio.name : "–"}
            </Typography>
          </Box>
          <Box display="flex" gap={2} alignItems="center">
            <Button
              size="small"
              variant={compare ? "contained" : "text"}
              onClick={handleCompare}
            >
              Compare
            </Button>
            <PortfolioSelector />
          </Box>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Box mb={2}>
          <PortfolioStats />
        </Box>
        <Divider sx={{ mb: 2 }} />
        {compare ? <PortfolioGraph /> : <PortfolioGraphSimple />}
      </CardContent>
    </Card>
  );
}
