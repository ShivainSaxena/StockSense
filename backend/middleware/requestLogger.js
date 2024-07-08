const pino = require("pino")();
const { format } = require("date-fns");

// Function to format timestamp using date-fns
function formatTimestamp(timestamp) {
  return format(timestamp, "MMMM d, yyyy h:mm:ss a");
}

// Middleware function to log requests
function requestLogger(req, res, next) {
  pino.info({
    method: req.method,
    url: req.url,
    body: req.body,
    query: req.query,
    timestamp: formatTimestamp(new Date()), // Example timestamp, replace with your actual timestamp
  });
  next();
}

module.exports = {
  requestLogger,
};
