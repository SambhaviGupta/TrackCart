#TrackCart – Product Price Tracker & Alert System

TrackCart is a backend REST API that tracks product prices over time using scheduled cron jobs, stores price history in MongoDB, and triggers alerts when prices drop below a user-defined threshold.

Tech Stack
- Node.js + Express.js
- MongoDB + Mongoose
- node-cron (scheduled jobs)
- Nodemailer (price alerts)

#Getting Started

Clone the repo and install dependencies:

```bash
git clone https://github.com/SambhaviGupta/TrackCart.git
cd TrackCart
npm install
```

Create a `.env` file in the root folder:
PORT=5000
MONGO_URI=your_mongodb_connection_string

Start the server:

```bash
node index.js
```

#How It Works

- Products are added with a name, current price, and alert threshold
- A cron job runs every 2 hours, simulating price fluctuations and logging new prices to MongoDB
- If the updated price drops below the threshold, an alert is triggered
- REST APIs expose price history and trend analytics

#API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/products | Add a new product to track |
| GET | /api/products | Get all tracked products |
| GET | /api/products/:id/history | Get full price history for a product |
| GET | /api/products/:id/trends | Get price trends (lowest, highest, average, % drop) |
