const getAllSymbols = async (req, res) => {
  const db = req.app.locals.db;
  const allStocks = db.collection("stock-symbol").find();
  const allValues = await allStocks.toArray();
  res.status(200).json(allValues);
};

const getStockProfile = async (req, res) => {
  const symbol = req.params.symbol;
  const db = req.app.locals.db;
  const profile = await db.collection("stock-data").findOne({ Symbol: symbol });
  if (!profile) {
    return res.status(404).json({ error: "Stock symbol not found" });
  }
  res.status(200).json(profile);
};

module.exports = {
  getAllSymbols,
  getStockProfile,
};
