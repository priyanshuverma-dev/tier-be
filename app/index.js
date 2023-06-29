require("dotenv").config();

const express = require("express");
const cors = require("cors");
const http = require("http");
const bodyParser = require("body-parser");
const compression = require("compression");
const router = require("./route/index.js");
const {
  notFoundMiddleware,
  errorMiddleware,
} = require("./middlewares/server.js");
const app = express();

const PORT = process.env.PORT || 8080;

// All your routes and middleware here.....
app.use(express.json());
app.use("/api", router);
app.use(cors());
app.use(compression());
app.use(bodyParser.json());

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log("Sever is up");
  console.log(`On http://localhost:${PORT}`);
  console.log(`"Server running on http://localhost:${PORT}/"`);
});
