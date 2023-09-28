import cheerio from "cheerio";

export function convertInstagramReelsToDdInstagram(originalUrl: string) {
  return originalUrl.replace(
    /https?:\/\/(www\.)?instagram\.com/g,
    "https://www.ddinstagram.com"
  );
}
export function getElementFromHTML(html: string, url: string) {
  const instagramPostPattern =
    /^https:\/\/www\.ddinstagram\.com\/p\/[A-Za-z0-9_-]+\/?$/;
  const instagramReelsPattern =
    /^https:\/\/www\.ddinstagram\.com\/reels\/[A-Za-z0-9_-]+\/?$/;

  const $ = cheerio.load(html);
  if (instagramPostPattern.test(url)) {
    const twitterImageMeta = $('meta[name="twitter:image"]');
    const twitterImageContent = twitterImageMeta.attr("content");
    return {
      url: `https://www.ddinstagram.com${twitterImageContent}`,
      type: "image",
    };
  }
  if (instagramReelsPattern.test(url)) {
    const twitterPlayerStreamMeta = $('meta[name="twitter:player:stream"]');
    const twitterPlayerStreamContent = twitterPlayerStreamMeta.attr("content");
    return {
      url: `https://www.ddinstagram.com${twitterPlayerStreamContent}`,
      type: "video",
    };
  }
}

export function convertTwitterUrl(originalUrl: string) {
  // Define a regular expression pattern to match Twitter URLs
  const parts = originalUrl.split("/");
  const username = parts[3];
  const tweetId = parts[5].split("?")[0]; // Remove the query string

  return `https://d.fxtwitter.com/${username}/status/${tweetId}`;
}
