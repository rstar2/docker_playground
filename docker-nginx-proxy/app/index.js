const http = require('http');


const handleMiddleware = (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('Hello');

    res.end();
};

const port = process.env.PORT || 3000;
http.createServer(handleMiddleware)
    .listen(port, () => {
        console.log(`HTTP server listening on port ${port}`);
    });
