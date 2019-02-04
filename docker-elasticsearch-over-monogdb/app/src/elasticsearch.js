const elasticsearch = require('elasticsearch');
const ELASTICSEARCH_URL = process.env.ELASTICSEARCH_URL;

// instantiate an Elasticsearch client
const client = new elasticsearch.Client({
    // hosts: [ELASTICSEARCH_URL], // if connecting to a cluster
    host: ELASTICSEARCH_URL,
    log: 'trace',
});


// the way this application is currently started assumes that the ElasticSearch server
// is already properly running and accessible,
// but still a "queued actions" technique can be used if needed (similar is in the Mongoose wrapper)
let isConnected = false;
client.ping({
    // ping usually has a 3000ms timeout
    requestTimeout: 1000
}, (error) => {
    if (error) {
        console.trace('elasticsearch cluster is down!');
    } else {
        isConnected = true;
        console.log('All is well');
    }
});



/**
 * @param {String} q
 * @return {Promise<{id:String,title:String,content:String}[]>}
 */
exports.searchArticles = async (q) => {
    // TODO: could queue the task for when client is connected in real production app
    if (!isConnected)
        throw new Error('ElasticSearch is still to ready');


    // TODO: https://scotch.io/tutorials/build-a-real-time-search-engine-with-node-vue-and-elasticsearch
    const response = await client.search({
        index: 'twitter',
        type: 'tweets',
        body: {
            query: {
                match: {
                    body: 'elasticsearch'
                }
            }
        }
    });

    return response;
};
