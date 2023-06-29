const puppeteer = require("puppeteer");

let browserInstance = null;
let browserInstanceWs = null;

exports.getBrowser = async () => {
  if (!browserInstanceWs) {
    browserInstance = await puppeteer.launch({ headless: false });
    const WS = browserInstance.wsEndpoint();
    browserInstanceWs = WS;
  } else {
    browserInstance = await puppeteer.connect({
      browserWSEndpoint: browserInstanceWs,
    });
  }
  return browserInstance;
};

exports.closeBrowser = async () => {
  if (browserInstance) {
    await browserInstance.close();
    browserInstance = null;
    browserInstanceWs = null;
  }
};
