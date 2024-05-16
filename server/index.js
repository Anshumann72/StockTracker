// index.js

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios"); // Import Axios library

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Dummy data for the watchlist
let watchlist = ["AAPL", "GOOGL", "MSFT"];

// Alpha Vantage API base URL
const alphaVantageBaseUrl = "https://www.alphavantage.co/query";

// Route to get the watchlist with stock prices

app.get("/api/watchlist", async (req, res) => {
  try {
    // Fetch stock prices for each symbol in the watchlist
    const promises = watchlist.map(async (symbol) => {
      const response = await axios.get(alphaVantageBaseUrl, {
        params: {
          function: "TIME_SERIES_INTRADAY",
          symbol,
          interval: "5min",
          apikey: "BVLTDC9SPQR6TDTD", // Your Alpha Vantage API key
        },
      });
      // Extract the latest stock price from the response
      const latestPrice =
        response.data["Time Series (5min)"] &&
        response.data["Time Series (5min)"][
          Object.keys(response.data["Time Series (5min)"])[0]
        ]["4. close"];
      return {
        symbol,
        price: latestPrice || "N/A",
      };
    });

    // Wait for all promises to resolve
    const stockPrices = await Promise.all(promises);

    res.json({ watchlist: stockPrices });
  } catch (error) {
    console.error("Error fetching watchlist:", error);
    res.status(500).json({ error: "Failed to fetch watchlist" });
  }
});

// Route to add a symbol to the watchlist
app.post("/api/watchlist", (req, res) => {
  const { symbol } = req.body;
  watchlist.push(symbol);
  res.json({ success: true });
});

// Route to remove a symbol from the watchlist
app.delete("/api/watchlist/:symbol", (req, res) => {
  const { symbol } = req.params;
  watchlist = watchlist.filter((item) => item !== symbol);
  res.json({ success: true });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, "localhost", () => {
  console.log(`Server is running on port ${PORT}`);
});
