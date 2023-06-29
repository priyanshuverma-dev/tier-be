const puppeteer = require("puppeteer");
const fs = require("fs");
const BrowserManager = require("./services/browserManager");

// export const getReels = async () => {};
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const cookiesFilePath = "./cookies.json";

exports.fetchSession = async (username, password) => {
  // const browser = await puppeteer.launch({ headless: "new" });
  const browser = await BrowserManager.getBrowser();

  const page = await browser.newPage();
  try {
    await page.goto("https://instagram.com/accounts/login");
    await page.waitForSelector('input[name="username"]');
    await delay(5000);
    await page.type('input[name="username"]', `${username}`);
    await page.type('input[name="password"]', `${password}`);

    await page.click('button[type="submit"]');
    await page.waitForNavigation();
    await delay(5000);
    // Save Session Cookies
    const cookiesObject = await page.cookies();
    // Write cookies to temp file to be used in other profile pages
    fs.writeFile(
      cookiesFilePath,
      JSON.stringify(cookiesObject),
      function (err) {
        if (err) {
          console.log("The file could not be written.", err);
        }
        console.log("Session has been successfully saved");
      }
    );
    if ((await browser.pages()).length >= 2) {
      await page.close();
    }
    // await browser.close();
    browser.disconnect();
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

exports.fetchReels = async () => {
  // const browser = await puppeteer.launch({ headless: "new" });
  const browser = await BrowserManager.getBrowser();

  const page = await browser.newPage();

  const previousSession = fs.existsSync(cookiesFilePath);
  if (previousSession) {
    // If file exists, load the cookies
    const cookiesString = fs.readFileSync(cookiesFilePath);
    const parsedCookies = JSON.parse(cookiesString);
    if (parsedCookies.length !== 0) {
      for (let cookie of parsedCookies) {
        await page.setCookie(cookie);
      }
      console.log("Session has been loaded in the browser");
    }
  }

  if (page.url() === "https://instagram.com/reels/*") {
    await page.reload({
      waitUntil: "domcontentloaded",
    });
  } else {
    await page.goto("https://instagram.com/reels", {
      waitUntil: "domcontentloaded",
    });
  }

  await page.waitForSelector("video");

  const reelData = await page.evaluate(() => {
    const reelEls = Array.from(document.querySelectorAll("video"));
    const data = reelEls.map((reel) => {
      return reel.src;
    });
    return data;
  });
  console.log(reelData);

  if ((await browser.pages()).length >= 2) {
    await page.close();
  }

  browser.disconnect();

  return reelData;
};
