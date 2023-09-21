import { convertInstagramReelsToDdInstagram } from "../utils.js";

export async function getReels(req, res) {
  let id = 0;

  try {
    const apiKey = "priyanshu";

    const urlParam = req.params[0];
    const convertedUrl = convertInstagramReelsToDdInstagram(urlParam);

    if (!apiKey) {
      res.status(401).json({
        message: "API key is required.",
        error: "Unauthorized",
      });
    }

    if (apiKey != "priyanshu") {
      res.status(401).json({
        message: "API key is invalid.",
        error: "Unauthorized",
      });
    }

    const response = await fetch(convertedUrl, {
      redirect: "follow",
    });

    if (response.ok) {
      // The response.url property will contain the final redirected URL
      id = id + 1;
      const finalUrl = response.url;
      res.json({ id: id, message: finalUrl, error: null }); // Respond with success
    } else {
      throw new Error("Request failed with status " + response.status);
    }
  } catch (err) {
    console.log(err);
    res.status(501).json({
      message: "Can't fetch reels. Server Error",
      error: err.message,
    });
  }
}
