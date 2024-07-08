const { execFileSync } = require("child_process");
const finnhub = require("finnhub");
const { format, subMonths, parseISO } = require("date-fns");

const api_key = finnhub.ApiClient.instance.authentications["api_key"];
api_key.apiKey = process.env.FINNHUB_KEY;
const finnhubClient = new finnhub.DefaultApi();

const PredictTickerPrice = async (req, res) => {
  const symbol = req.params.ticker;
  let tomorrowPrice;

  try {
    const stdout = execFileSync("python", ["stock.py", symbol], {
      encoding: "utf8",
    });
    tomorrowPrice = parseFloat(parseFloat(stdout.trim()).toFixed(2));
  } catch (error) {
    return res
      .status(404)
      .json({ error: "Input the correct stock symbol/ticker" });
  }

  try {
    const quote = await new Promise((resolve, reject) => {
      finnhubClient.quote(symbol, (error, data) => {
        if (error) {
          return reject(error);
        }
        resolve(data);
      });
    });

    const recommendationTrends = await new Promise((resolve, reject) => {
      finnhubClient.recommendationTrends(symbol, (error, data) => {
        if (error) {
          return reject(error);
        }
        data[0].period = format(parseISO(data[0].period), "MMMM yyyy");

        resolve(data[0]);
      });
    });

    const today = new Date();
    const twoMonthsAgo = subMonths(today, 2);
    const todayFormatted = format(today, "yyyy-MM-dd");
    const twoMonthsAgoFormatted = format(twoMonthsAgo, "yyyy-MM-dd");

    const news = await new Promise((resolve, reject) => {
      finnhubClient.companyNews(
        symbol,
        twoMonthsAgoFormatted,
        todayFormatted,
        (error, data, response) => {
          if (error) {
            return reject(error);
          }
          const formattedNews = data.map((item) => ({
            ...item,
            datetime: format(new Date(item.datetime * 1000), "MMMM d, yyyy"),
          }));
          resolve(formattedNews.slice(0, 2));
        }
      );
    });

    const result = {
      change: quote.c > tomorrowPrice ? "down" : "up",
      tPrice: tomorrowPrice,
      ...recommendationTrends,
      news,
    };

    res.json(result);
  } catch (error) {
    res.sendStatus(500);
  }
};

module.exports = PredictTickerPrice;
