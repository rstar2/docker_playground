const http = require('http');
const uuid = require('uuid');

const db = require('./db');


const parseQueryMiddleware = (req, res, next) => {
    req.query = {};
    next();
};

const dbMiddleware = (req, res, next) => {
    if (req.query.uid) {
        db.getUser(req.query.uid)
            .then(user => {
                req.query.name = user.name;
                next();
            })
            .catch(() => next());
    } else {
        next();
    }


};


const handleMiddleware = (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write(`Hello ${req.query.name || 'Anonymous'} - ${uuid.v1()}`);
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
