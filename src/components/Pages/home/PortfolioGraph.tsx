import { useAppSelector } from "../../../store";
import { selectActivePortfolioHistory } from "../../../store/portfolios/selectors";

export default function PortfolioGraph() {
  const history = useAppSelector(selectActivePortfolioHistory);
  console.log("history", history);

  return (
    <div>
      {history && history.length > 0 ? (
        <div>
          {/* Render your graph component here using the history data */}
          <h3>Portfolio History</h3>
          <ul>
            {history.map((entry, index) => (
              <li key={index}>
                Date: {entry.date}, Value: {entry.value}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No portfolio history available.</p>
      )}
    </div>
  );
}
