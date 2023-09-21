import express, { json } from "express";
import cors from "cors";
import { createServer } from "http";
import compression from "compression";
import { getReels } from "../controllers/service.js";
const app = express();

const PORT = process.env.PORT || 8080;

// All your routes and middleware here.....
app.use(json());
app.use(cors());
app.use(compression());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// All routes
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Status Ok",
  });
});
app.get("/reel/*", getReels);

const server = createServer(app);

server.listen(PORT, () => {
  console.log("Sever is up");
  console.log(`On http://localhost:${PORT}`);
  console.log(`"Server running on http://localhost:${PORT}/"`);
});
