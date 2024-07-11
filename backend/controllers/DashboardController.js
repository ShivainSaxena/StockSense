const fetch = require("node-fetch");
const { parse, format } = require("date-fns");
const yahooFinance = require("yahoo-finance2").default;

const getDashboardStocksData = async (req, res) => {
  const db = req.app.locals.db;

  const dashboard = await db
    .collection("dashboards")
    .findOne({ email: req.email });
  if (!dashboard || dashboard.dash.length === 0) {
    return res.status(404).json({ error: "No dashboard found" });
  }
  try {
    const stockDataPromises = dashboard.dash.map((obj) => {
      if (obj.type === "widget") {
        return getWidgetData(obj.symbol);
      } else if (obj.type === "graph") {
        return getHistoricalData(obj.symbol);
      }
    });

    const stockDataArray = await Promise.all(stockDataPromises);

    const aggregatedData = dashboard.dash.map((obj, index) => {
      const stockData = stockDataArray[index];

      if (obj.type === "widget") {
        return {
          ...stockData,
          type: obj.type,
        };
      } else if (obj.type === "graph") {
        return {
          ...stockData,
          type: obj.type,
        };
      }
    });
    return res.status(200).json(aggregatedData);
  } catch (error) {
    console.error("Error fetching stock data:", error);
    return res.status(500).json({ error: "Failed to fetch stock data" });
  }
};

const getWidgetData = async (ticker) => {
  const results = await yahooFinance.quote(ticker);
  const rObj = {
    symbol: results.symbol,
    name: results.shortName,
    close: results.regularMarketPrice,
    change: results.regularMarketChange,
    percent_change: results.regularMarketChangePercent,
  };

  return rObj;
};

const getHistoricalData = async (ticker) => {
  const endDate = new Date(); // Current date
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - 7); // Date 7 days ago

  const queryOptions = {
    period1: startDate.toISOString(), // Start date
    period2: endDate.toISOString(), // End date
    interval: "90m", // 1 hour 30 min interval
  };

  const result = await yahooFinance.chart(ticker, queryOptions);

  const quotes = result.quotes;
  const formattedData = quotes.map((quote) => ({
    datetime: format(new Date(quote.date), "MMMM d, h:mm a"),
    close: parseFloat(quote.close.toFixed(2)),
  }));
  const rObj = {
    data: formattedData,
    interval: "90m",
    symbol: result.meta.symbol,
  };

  return rObj;
};

const addDashboardStock = async (req, res) => {
  const { ticker, type } = req.body;
  const db = req.app.locals.db;

  // Define the criteria to check if the object exists in the array
  const filter = {
    email: req.email,
    dash: { $elemMatch: { symbol: ticker, type } },
  };
  const userDash = await db.collection("dashboards").findOne(filter);

  if (userDash) {
    return res.status(409).json({ error: "Stock already in dashboard" });
  }

  const dash = await db.collection("dashboards").findOne({ email: req.email });

  if (dash) {
    const update = {
      $push: { dash: { symbol: ticker, type } },
    };
    await db.collection("dashboards").updateOne({ email: req.email }, update);
    return res.status(200).json({ mssg: "Stock added" });
  } else {
    const doc = {
      email: req.email,
      dash: [{ symbol: ticker, type }],
    };
    await db.collection("dashboards").insertOne(doc);
    res.status(200).json({ mssg: "Stock added" });
  }
};

const deleteDashboardStock = async (req, res) => {
  const { ticker } = req.body;
  const db = req.app.locals.db;
  try {
    await db
      .collection("dashboards")
      .updateOne({ email: req.email }, { $pull: { dash: { symbol: ticker } } });
    return res.status(200).json({ mssg: "Stock deleted" });
  } catch (error) {
    console.log("Error deleting stock" + error);
    res.status(500).json({ error: "Error deleting stock" });
  }
};

module.exports = {
  getDashboardStocksData,
  addDashboardStock,
  deleteDashboardStock,
};
