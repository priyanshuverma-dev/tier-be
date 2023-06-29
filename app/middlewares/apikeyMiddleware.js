// Middleware function for API key verification
const apiKeyMiddleware = (req, res, next) => {
  const apiKey = req.headers["api-key"]; // Assuming the API key is provided in the 'api-key' header

  // Check if the API key is valid
  if (apiKey === process.env.PERSONAL_API) {
    // Replace 'YOUR_API_KEY' with your actual API key
    next(); // Proceed to the next middleware or route handler
  } else {
    res.status(401).json({ error: "Invalid API key" }); // Unauthorized status if the API key is invalid
  }
};

module.exports = apiKeyMiddleware;
