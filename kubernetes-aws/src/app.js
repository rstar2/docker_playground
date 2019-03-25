const express = require('express');
const asyncMiddleware = require('express-async-handler');

const app = express();

app.get('/', asyncMiddleware((req, res) => {
    res.status(200).send('Hello World!');
}));

app.get('/async', asyncMiddleware(async (req, res) => {
    const result = await Promise.resolve('success');
    res.status(200).send(`Async ${result}`);
}));

app.get('/asyncError', asyncMiddleware(async (req, res) => {
    const result = await Promise.reject('failed');
    res.status(200).send(`Async ${result}`);
}));

// Global Express error handler
// eslint-disable-next-line
app.use((error, req, res, next) => {
    res.status(500).send(`Error: ${error}`);
});


app.listen(3000, () => console.log('Server is running on port 3000'));