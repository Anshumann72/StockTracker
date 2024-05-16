// StockCard.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Spinner } from "react-bootstrap";

function StockCard({ symbol }) {
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await axios.get(
          `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=BVLTDC9SPQR6TDTD`
        );
        setStockData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching stock data:", error);
        setLoading(false);
      }
    };

    fetchStockData();
  }, [symbol]);

  if (loading) {
    return <Spinner animation="border" />;
  }

  return (
    <Card>
      <Card.Body>
        <Card.Title>{symbol}</Card.Title>
        <Card.Text>
          Latest Price:{" "}
          {
            stockData["Time Series (5min)"][
              Object.keys(stockData["Time Series (5min)"])[0]
            ]["4. close"]
          }
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default StockCard;
