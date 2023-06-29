const { fetchReels, fetchSession } = require("./scraping.func");

exports.getReels = async (req, res) => {
  try {
    const reels = await fetchReels();

    res.status(200).json({
      message: reels,
      error: "",
    });
  } catch (err) {
    console.log(err);
    res.status(501).json({
      message: "Can't fetch reels. Server Error",
      error: err.message,
    });
  }
};

exports.relogin = async (req, res) => {
  if (req.body.username === null) {
    res.status(400).json({
      message: "You have not provided username",
      error: "No Username",
    });
  }
  if (req.body.password === null) {
    res.status(400).json({
      message: "You have not provided password",
      error: "No password",
    });
  }
  try {
    const session = await fetchSession();

    if (session === true) {
      res.status(200).json({
        message: "Session Created Successfully",
        error: "",
      });
    } else {
      res.status(400).json({
        message: "Can't fetch session. Server Error",
        error: err.message,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(501).json({
      message: "Can't fetch reels. Server Error",
      error: err.message,
    });
  }
};
