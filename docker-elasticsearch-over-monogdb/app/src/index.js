const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = require('./db');
const elastic = require('./elasticsearch');

app.use('/api/article/:id?', (req, res) => {
    if (req.params.id) {
        db.getArticle(req.params.id)
            .then(({ title }) => res.send(`Title: ${title}`))
            .catch(error => {
                console.error(error);
                res.status(500).send(`Getting article ${req.params.id} failed`);
            });
    } else {
        db.getArticles()
            .then(articles => res.send(`Found ${articles.length} articles`))
            .catch(error => {
                console.error(error);
                res.status(500).send('Getting articles failed');
            });
    }
});

// MongoDB search
app.use('/api/article/search', (req, res) => {
    const q = req.query.q;
    db.searchArticles(q)
        .then(articles => res.json(articles))
        .catch(error => {
            console.error(error);
            res.status(500).send(`Searching with MongoDB for ${q} failed`);
        });
});

// ElasticSearch search
app.use('/api/article/elasticseach', (req, res) => {
    const q = req.query.q;
    elastic.searchArticles(q)
        .then(articles => res.json(articles))
        .catch(error => {
            console.error(error);
            res.status(500).send(`Searching with ElasticSearch for ${q} failed`);
        });
});

const port = process.env.PORT || 3000;
app.listen(port || 3000, () => {
    console.log('Express server listening on port ' + port);
});

