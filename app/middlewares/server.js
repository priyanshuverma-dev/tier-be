const errorMiddleware = (err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
};
const notFoundMiddleware = (req, res, next) => {
  res.status(404).json({ error: "Not Found" });
};

module.exports = {
  errorMiddleware,
  notFoundMiddleware,
};
