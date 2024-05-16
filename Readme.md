# Stock Watchlist Application

This is a simple web application that allows users to track their stock watchlist. Users can add and remove stocks from their watchlist, and the application will display real-time stock prices using data fetched from the Alpha Vantage API.

## Features

- Add stocks to watchlist
- Remove stocks from watchlist
- Real-time stock price updates
- User-friendly interface

## Technologies Used

- Frontend: React.js
- Backend: Node.js, Express.js
- Database: MongoDB (for user authentication and watchlist storage)
- External API: Alpha Vantage (for real-time stock prices)
- Other tools: Axios (for API requests), Bootstrap (for styling)

## Local Deployment

To deploy this application locally, follow these steps:

### Prerequisites

- Node.js and npm installed on your machine
- MongoDB installed and running

### Installation

1. Clone the repository to your local machine:

```bash
git clone https://github.com/Anshumann72/StockTracker
cd stock-watchlist-app
```

2. Install dependencies for both the frontend and backend:

```bash
cd client
npm install
cd ../server
npm install
```

3. Set up environment variables:

   - Create a `.env` file in the `backend` directory.
   - Add the following environment variables to the `.env` file:

     ```plaintext
     MONGODB_URI=mongodb+srv://72198anshumann:<password>@cluster0.3jnunoi.mongodb.net/

     ALPHA_VANTAGE_API_KEY=<alpha-vantage-api-key>
     ```

### Running the Application

1. Start the backend server:

```bash
cd server
npm start
```

2. Start the frontend development server:

```bash
cd client
npm run dev
```

3. Access the application in your web browser:

Open [http://localhost:5173].

## Deployment

## Contributing

Contributions are welcome! Please create a pull request with your changes.

## License

This project is licensed under the [MIT License](LICENSE).

---
