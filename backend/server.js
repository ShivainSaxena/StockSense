require("dotenv").config();
const express = require("express");
const { MongoClient } = require("mongodb");
const app = express();
const StockInfoRoutes = require("./routes/StockInfoRoutes");
const UserAuthRoutes = require("./routes/AuthRoutes");
const DashboardRoutes = require("./routes/DashboardRoutes");
const PredictionRoutes = require("./routes/PredictionRoutes");
const { requestLogger } = require("./middleware/requestLogger");

const PORT = process.env.PORT || 4000;

app.use(express.json());

app.use(requestLogger);

// Stock Information Routes
app.use("/api/stock", StockInfoRoutes);

// User Authentication Routes
app.use("/api/auth", UserAuthRoutes);

// Dashboard manipulation Routes
app.use("/api/dashboard", DashboardRoutes);

// Stock prediction routes
app.use("/api/predict", PredictionRoutes);

MongoClient.connect(process.env.CONNECTION_STRING)
  .then((client) => {
    app.locals.db = client.db("Stock-Fullstack");
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}...`);
    });
  })
  .catch((err) => console.log(err));
