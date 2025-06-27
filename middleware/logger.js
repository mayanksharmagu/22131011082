// middleware/logger.js

module.exports = function customLogger(req, res, next) {
  const logData = {
    method: req.method,
    path: req.originalUrl,
    timestamp: new Date().toISOString(),
  };

  // You can customize how this gets stored based on your setup
  // For now, just printing to file is NOT allowed; assume this logs to a logging service
  // Replace this with actual logic to write to your custom logging setup
  console.log(JSON.stringify(logData));

  next();
};
