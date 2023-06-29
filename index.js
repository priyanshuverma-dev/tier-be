import express, { json } from "express";
import cors from "cors";
import { createServer } from "http";
import compression from "compression";
import router from "./route/index.js";
import { notFoundMiddleware, errorMiddleware } from "./middlewares/server.js";
const app = express();

const PORT = process.env.PORT || 8080;

// All your routes and middleware here.....
app.use(json());
app.use("/api", router);
app.use(cors());
app.use(compression());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const server = createServer(app);

server.listen(PORT, () => {
  console.log("Sever is up");
  console.log(`On http://localhost:${PORT}`);
  console.log(`"Server running on http://localhost:${PORT}/"`);
});
