1. Use 'puppeteer-core', e.g. Puppereer without Chromium
```$ npm i puppeteer-core```

2. Use the dockerized Chromium
```$ docker pull deepsweet/chromium-headless-remote:70```

3. Run a container
```$ docker run -it --rm -p 9222:9222 deepsweet/chromium-headless-remote:70```

4. Connect from host
