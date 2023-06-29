import { launch, connect } from "puppeteer";

let browserInstance = null;
let browserInstanceWs = null;

export async function getBrowser() {
  if (!browserInstanceWs) {
    browserInstance = await launch({ headless: "new", args: ["--no-sandbox"] });
    const WS = browserInstance.wsEndpoint();
    browserInstanceWs = WS;
  } else {
    browserInstance = await connect({
      browserWSEndpoint: browserInstanceWs,
    });
  }
  return browserInstance;
}

export async function closeBrowser() {
  if (browserInstance) {
    await browserInstance.close();
    browserInstance = null;
    browserInstanceWs = null;
  }
}
