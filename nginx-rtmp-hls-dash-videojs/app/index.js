const path = require('path');
const express = require('express');

const app = express();

let route;
const SITE_BASEURL = process.env.SITE_BASEURL;
if (SITE_BASEURL) {
    route = new express.Router();
    app.use(SITE_BASEURL, route);
} else {
    route = app;
}

route.use(express.static(path.join(__dirname, 'public')));

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Express server listening on port ${port}`);
});
