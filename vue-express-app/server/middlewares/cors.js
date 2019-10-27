const cors = require('cors');

const whitelist = new Set([
    'http://localhost:8000',
    'http://localhost:9000',
    'http://localhost:9001',
]);

if (process.env.PUBLIC_APP_URL) {
    // the real production app URL, like 'https://vue-app-express.com'
    whitelist.add(process.env.PUBLIC_APP_URL);
}

const options = {
    origin: function(origin, callback) {
        if (whitelist.has(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
};

module.exports = {
    cors: cors(),
    corsOptions : cors(options),
};
