const express = require("express");
const { getReels, relogin } = require("../controller");
const apiKeyMiddleware = require("../middlewares/apikeyMiddleware");

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    System: "running",
    code: 200,
  });
});

router.get("/reels", apiKeyMiddleware, getReels);
router.get("/relogin", apiKeyMiddleware, relogin);
module.exports = router;
