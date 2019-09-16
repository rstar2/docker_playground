const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const elastic = require('./elasticsearch');

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

route.use('/api', bodyParser.urlencoded({ extended: false }));
route.use('/api', bodyParser.json());

// ElasticSearch search
route.use('/api/article/elasticsearch', (req, res) => {
    const q = req.query.q;
    elastic.searchArticles(q)
        .then(articles => res.json({data: {articles}}))
        .catch(error => {
            console.error(error);
            res.status(500).send(`Searching with ElasticSearch for ${q} failed`);
        });
});

route.use((req, res) => {
    console.error(`Not handled path ${req.path}`);
    res.send(`Not handled path ${req.path}`);
});


const port = process.env.PORT || 3000;
app.listen(port || 3000, () => {
    console.log(`Express server listening on port ${port} and base-path: ${SITE_BASEURL || '/'}`);
});

