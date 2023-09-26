import fetch from "node-fetch";

import {
  convertInstagramReelsToDdInstagram,
  getElementFromHTML,
} from "../utils.js";

export async function getReels(req, res) {
  let id = 0;

  try {
    id = id + 1;
    const apiKey = "priyanshu";

    const urlParam = req.params[0];
    const convertedUrl = convertInstagramReelsToDdInstagram(urlParam);

    const response = await fetch(convertedUrl, {
      redirect: "follow",
      headers: {
        "user-agent":
          "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
      },
    });
    if (response.ok) {
      const htmlRaw = await response.text();
      const finalUrl = getElementFromHTML(htmlRaw, response.url);
      // The response.url property will contain the final redirected URL
      const newRes = await fetch(finalUrl, { redirect: "follow" });
      res.json({ id: id, message: newRes.url, error: null }); // Respond with success
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
