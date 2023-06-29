import { Router } from "express";
import { getReels, relogin } from "../controllers/func.controller";
import apiKeyMiddleware from "../middlewares/apikey.middleware";

const router = Router();

router.get("/", (req, res) => {
  res.status(200).json({
    System: "running",
    code: 200,
  });
});

router.get("/reels", apiKeyMiddleware, getReels);
router.get("/relogin", apiKeyMiddleware, relogin);
export default router;
