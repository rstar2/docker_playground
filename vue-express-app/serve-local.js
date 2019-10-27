const path = require('path');

// load the local dev env files
require('dotenv').config({path: path.resolve(__dirname, '.env.local')});

require('./serve');
