const http = require('http');
const querystring = require('querystring');

const db = require('./db');

const parseQueryMiddleware = (req, res, next) => {
    const splits = req.url.split('?');
    const query = splits[1] || '';
    req.query = querystring.parse(query);
    next();
};

const dbMiddleware = (req, res, next) => {
    const uid = req.query.uid;
    if (uid) {
        console.log(`Getting user for ${uid}`);
        db.getUser(uid)
            .then(user => user || Promise.reject(`No user with uid ${uid}`))
            .then(({ name }) => {
                console.log(`User name for ${uid} is ${name}`);
                req.query.name = name;
                next();
            })
            .catch((error) => {
                req.error = error;
                next();
            });
    } else {
        db.getUsers()
            .then(users => {
                req.query.users = users;
                next();
            })
            .catch((error) => {
                req.error = error;
                next();
            });
    }
};

const handleMiddleware = (req, res) => {
    if (req.error) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        res.write('' + req.error); // should write a string
    } else {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        if (req.query.uid) {
            res.write(`Hello ${req.query.name || 'Anonymous'}`);
        } else {
            res.write(`List users ${req.query.users.join()}`);
        }
    }

    res.end();
};

// simple middlewares framework
const createHandler = (middlewares) => {
    if (false === Array.isArray(middlewares)) {
        middlewares = [middlewares];
    }

    const execMiddleware = (req, res, count) => {
        const middleware = middlewares[count];
        console.log(`Handling middleware ${count}`);

        middleware(req, res, count < middlewares.length - 1 ? () => {
            execMiddleware(req, res, (count + 1));
        } : () => {
            console.log('Skipping next middlewares');
        });

        if (count === middlewares.length - 1) {
            console.log('Handled all middlewares');
        }
    };

    return (req, res) => {
        console.log('Handle request');
        execMiddleware(req, res, 0);
    };
};

const port = process.env.PORT || 3000;
http.createServer(createHandler([
    parseQueryMiddleware,
    dbMiddleware,
    handleMiddleware]))
    .listen(port, () => {
        console.log(`HTTP server listening on port ${port}`);
    });
