const puppeteer = require('puppeteer-core');
const request = require('request-promise-native');

(async () => {
    try {
        const { body: { webSocketDebuggerUrl } } = await request({
            uri: 'http://localhost:9222/json/version',
            json: true,
            resolveWithFullResponse: true
        });
        const browser = await puppeteer.connect({
            browserWSEndpoint: webSocketDebuggerUrl
        });
        const page = await browser.newPage();

        await page.goto('https://example.com');
        await page.screenshot({ path: 'example.png' });
        await browser.close();
    } catch (err) {
        console.error(err);
    }
})();
