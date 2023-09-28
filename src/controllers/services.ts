// // import fetch from "node-fetch";

// import {
//   convertInstagramReelsToDdInstagram,
//   convertTwitterUrl,
//   getElementFromHTML,
// } from "../libs/utils";
// // import { generateRequestId } from "../lib/requestCounter.js";

// export async function getReels(context) {
//   try {
//     const urlParam = context.params[0];
//     const convertedUrl = convertInstagramReelsToDdInstagram(urlParam);

//     const response = await fetch(convertedUrl, {
//       redirect: "follow",
//       headers: {
//         "user-agent":
//           "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
//       },
//     });
//     if (response.ok) {
//       const htmlRaw = await response.text();
//       const finalres = getElementFromHTML(htmlRaw, response.url);
//       // The response.url property will contain the final redirected URL
//       const newRes = await fetch(finalres.url, { redirect: "follow" });
//       const id = generateRequestId();
//       return res.json({
//         id: id,
//         message: newRes.url,
//         error: null,
//         type: finalres.type,
//         service: "instagram",
//       }); // Respond with success
//     } else {
//       throw new Error("Request failed with status " + response.status);
//     }
//   } catch (err) {
//     console.log(err);
//     return res.status(501).json({
//       message: "Can't fetch reels. Server Error",
//       error: err.message,
//     });
//   }
// }

// export async function getTwitter(req, res) {
//   try {
//     const urlParam = req.params[0];

//     const convertedUrl = convertTwitterUrl(urlParam);

//     const id = generateRequestId();
//     return res.json({
//       id: id,
//       message: convertedUrl,
//       error: null,
//       type: "custom",
//       service: "twitter",
//       code: "P200",
//     }); // Respond with success

//     const response = await fetch(convertedUrl, {
//       redirect: "follow",
//       method: "GET",
//       headers: {
//         "user-agent":
//           "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36",
//       },
//     });
//     console.log(response.headers);
//     if (response.ok) {
//       const cleanUrl = response.url.split("?")[0];
//       const type = cleanUrl.endsWith(".mp4")
//         ? "video"
//         : "image"
//         ? cleanUrl.endsWith(".jpg")
//         : "";
//     } else {
//       throw new Error("Request failed with status " + response.status);
//     }
//   } catch (err) {
//     console.log(err);
//     return res.status(501).json({
//       message: "Can't fetch reels. Server Error",
//       error: err.message,
//     });
//   }
// }
