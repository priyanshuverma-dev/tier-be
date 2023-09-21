export function convertInstagramReelsToDdInstagram(originalUrl) {
  // Split the original URL into parts
  const urlParts = originalUrl.split("/");

  // Get the unique code from the original URL
  const code = urlParts[urlParts.length - 2];

  // Create the new URL in "ddinstagram" format
  const newUrl = `https://www.ddinstagram.com/videos/${code}/1`;

  return newUrl;
}
