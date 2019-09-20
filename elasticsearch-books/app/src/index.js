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
route.use('/api/search', (req, res) => {
    const q = req.query.q;
    elastic.searchBooks(q)
        .then(books => res.json({data: books}))
        .catch(error => {
            console.error(error);
            res.status(500).send(`Searching for ${q} failed`);
        });
});

route.use('/api/get', (req, res) => {
    const id = req.query.id;
    elastic.getBook(id)
        .then(book => {
            if (book) res.json({data: book});
            else res.json({error: `Not found ${id}`});
        })
        .catch(error => {
            console.error(error);
            res.status(500).send(`Getting for ${id} failed`);
        });
});

route.use('/api/add', (req, res) => {
    const bookData = { title: req.body.title, contents: req.body.contents };
    elastic.addBook(bookData)
        .then(id => res.json({data: id}))
        .catch(error => {
            console.error(error);
            res.status(500).send('Adding failed');
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

