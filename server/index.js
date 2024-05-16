// index.js

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const mongoose = require("mongoose"); // Import Mongoose library

const alphaVantageBaseUrl = "https://www.alphavantage.co/query";

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://72198anshumann:WEKCoYOUtC9q95Fa@cluster0.3jnunoi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Define MongoDB schemas and models
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

const watchlistSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  symbol: String,
});

const Watchlist = mongoose.model("Watchlist", watchlistSchema);

// Route to get the watchlist with stock prices
app.get("/api/watchlist", async (req, res) => {
  try {
    // Fetch stock prices for each symbol in the watchlist
    const watchlist = await Watchlist.find();
    const promises = watchlist.map(async (item) => {
      const response = await axios.get(alphaVantageBaseUrl, {
        params: {
          function: "TIME_SERIES_INTRADAY",
          symbol: item.symbol,
          interval: "5min",
          apikey: "D8SF0ZXVJC66WQ8V", // Your Alpha Vantage API key
        },
      });
      // Extract the latest stock price from the response
      const latestPrice =
        response.data["Time Series (5min)"] &&
        response.data["Time Series (5min)"][
          Object.keys(response.data["Time Series (5min)"])[0]
        ]["4. close"];
      return {
        symbol: item.symbol,
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
app.post("/api/watchlist", async (req, res) => {
  const { userId, symbol } = req.body;
  try {
    const newWatchlistItem = new Watchlist({ userId, symbol });
    await newWatchlistItem.save();
    res.json({ success: true });
  } catch (error) {
    console.error("Error adding symbol to watchlist:", error);
    res.status(500).json({ error: "Failed to add symbol to watchlist" });
  }
});

// Route to remove a symbol from the watchlist
app.delete("/api/watchlist/:symbol", async (req, res) => {
  const { userId, symbol } = req.body;
  try {
    await Watchlist.findOneAndDelete({ userId, symbol });
    res.json({ success: true });
  } catch (error) {
    console.error("Error removing symbol from watchlist:", error);
    res.status(500).json({ error: "Failed to remove symbol from watchlist" });
  }
});

// Route to handle user registration
app.post("/api/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Create a new user
    const newUser = new User({ username, password });
    await newUser.save();

    res.json({ success: true, message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Failed to register user" });
  }
});

// Add route to handle user login
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    // Find the user in the database
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    // Check if the password is correct
    if (user.password !== password) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    // If username and password are correct, return success
    res.json({ success: true, message: "Login successful" });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Failed to login" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, "localhost", () => {
  console.log(`Server is running on port ${PORT}`);
});
