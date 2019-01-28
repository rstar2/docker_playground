const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = require('./db');

app.use('/api/user/:uid?', (req, res) => {
    if (req.params.uid) {
        db.getUser(req.params.uid)
            .then(({ name }) => res.send(`Hello ${name}`))
            .catch(error => res.status(500).send(`Getting user ${req.params.uid} failed`));
    } else {
        db.getUsers()
            .then(users => res.send(`Found ${users.length} users`))
            .catch(error => res.status(500).send('Getting users failed'));
    }
});

app.use('/api/article/search', (req, res) => {
    const q = req.query.q;
    db.searchArticles(q)
        .then(articles => res.json(articles))
        .catch(error => {
            console.error(error);
            res.status(500).send(`Searching for ${q} failed`);
        });

});
app.use('/api/article/:id', (req, res) => {
    db.getArticle(req.params.id)
        .then(({ title }) => res.send(`Title: ${title}`))
        .catch(error => res.status(500).send(`Getting user ${req.params.id} failed`));
});

const port = process.env.PORT || 3000;
app.listen(port || 3000, function () {
    console.log('Express server listening on port ' + port);
});
