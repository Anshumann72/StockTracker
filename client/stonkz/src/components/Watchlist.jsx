import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

function Watchlist() {
  const [symbol, setSymbol] = useState("");
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    fetchWatchlist(); // Fetch watchlist on component mount
  }, []);

  const fetchWatchlist = async () => {
    try {
      // Fetch watchlist data from the backend for the current user
      const response = await axios.get("/api/watchlist");
      if (response.data && Array.isArray(response.data.watchlist)) {
        setWatchlist(response.data.watchlist);
      } else {
        console.error("Invalid watchlist data:", response.data);
      }
    } catch (error) {
      console.error("Error fetching watchlist:", error);
    }
  };

  const addToWatchlist = async () => {
    try {
      // Add symbol to watchlist on the backend
      await axios.post("/api/watchlist", { symbol });
      // Update local watchlist state
      setWatchlist([...watchlist, symbol]);
      // Clear input field
      setSymbol("");
    } catch (error) {
      console.error("Error adding to watchlist:", error);
    }
  };

  const removeFromWatchlist = async (symbolToRemove) => {
    try {
      // Remove symbol from watchlist on the backend
      await axios.delete(`/api/watchlist/${symbolToRemove}`);
      // Update local watchlist state
      setWatchlist(watchlist.filter((symbol) => symbol !== symbolToRemove));
    } catch (error) {
      console.error("Error removing from watchlist:", error);
    }
  };

  return (
    <div>
      <h5>Watchlist</h5>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Enter symbol"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value.toUpperCase())}
        />
      </Form.Group>
      <Button onClick={addToWatchlist}>Add</Button>
      {watchlist && watchlist.length > 0 ? (
        <ul>
          {watchlist.map((symbol) => (
            <li key={symbol}>
              {symbol}
              <Button onClick={() => removeFromWatchlist(symbol)}>
                Remove
              </Button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No symbols in the watchlist.</p>
      )}
    </div>
  );
}

export default Watchlist;
