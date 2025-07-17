import { Box, Card, CardContent, Divider, Typography } from "@mui/material";
import { useAppSelector } from "../../../store";
import { selectActivePortfolio } from "../../../store/portfolios/selectors";
import PortfolioSelector from "./PortfolioSelector";
import PortfolioStats from "./PortfolioStats";
import PortfolioGraph from "./PortfolioGraph";

export default function PortfolioDetails() {
  const selectedPortfolio = useAppSelector(selectActivePortfolio);

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
          <PortfolioSelector />
        </Box>
        <Divider sx={{ my: 2 }} />
        <Box mb={2}>
          <PortfolioStats />
        </Box>
        <PortfolioGraph />
      </CardContent>
    </Card>
  );
}
