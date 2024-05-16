import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import axios from "axios";

function Dashboard() {
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await axios.get("https://www.alphavantage.co/query", {
          params: {
            function: "TIME_SERIES_INTRADAY",
            symbol: "IBM",
            interval: "5min",
            apikey: "BVLTDC9SPQR6TDTD",
          },
        });
        if (response.data && response.data["Time Series (5min)"]) {
          setStockData(response.data["Time Series (5min)"]);
        } else {
          console.error("Invalid stock data:", response.data);
        }
      } catch (error) {
        console.error("Error fetching stock data:", error);
      }
    };

    fetchStockData();
  }, []);

  const addToWatchlist = (symbol) => {
    // Implement function to add symbol to watchlist
    console.log("Adding", symbol, "to watchlist");
  };

  return (
    <Container>
      <Row>
        {Object.entries(stockData).map(([timestamp, data]) => (
          <Col key={timestamp} md={4}>
            <Card>
              <Card.Body>
                <Card.Title>{timestamp}</Card.Title>
                <Card.Text>
                  Open: {data["1. open"]}
                  <br />
                  High: {data["2. high"]}
                  <br />
                  Low: {data["3. low"]}
                  <br />
                  Close: {data["4. close"]}
                  <br />
                  Volume: {data["5. volume"]}
                </Card.Text>
                <Button onClick={() => addToWatchlist("IBM")}>
                  Add to Watchlist
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Dashboard;
