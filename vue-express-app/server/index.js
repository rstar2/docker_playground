const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

function start() {
    if (!process.env.NODE_ENV || !process.env.PORT) {
        console.error(
            'ENV variables are missing.',
            'Verify that you have set them directly or in a .env file.'
        );
        process.exit(1);
    }

    const app = express();

    const port = process.env.PORT;
    const www = process.env.WWW || './dist';

    // serve the client app
    app.use(express.static(www));

    // serve the api routes
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));

    app.use('/api', routes);
    app.use('/api', (req, res) => {
        res.status(500).json({error: 'Invalid "api" request'});
    });

    // make anything go to the client SPA app
    app.get('*', (req, res) => {
        res.sendFile('index.html', { root: www });
    });

    // start the server
    app.listen(port, () => console.log(`listening on http://localhost:${port}`));
}

module.exports.start = start;
