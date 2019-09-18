const elasticsearch = require('@elastic/elasticsearch');
const URL = process.env.ELASTICSEARCH_URL;
const INDEX = process.env.ELASTICSEARCH_INDEX_NAME  || 'index';

// instantiate an Elasticsearch client
const client = new elasticsearch.Client({
    // nodes: [URL], // if connecting to a cluster
    node: URL,
    log: 'trace',
    pingTimeout: 1000,
    requestTimeout: 1000,
    maxRetries: 3
});

async function run() {
    // the way this application is currently started assumes that the ElasticSearch server
    // is already properly running and accessible,
    // but still a "queued actions" technique can be used if needed (similar is in the Mongoose wrapper)
    let isConnected = false;
    console.log('ElasticSearch pinging');
    client.ping((error) => {
        if (error) {
            console.trace('ElasticSearch is down!');
        } else {
            isConnected = true;
            console.log('ElasticSearch is up and running');
        }
    });

    // TODO: create the index now if not already created
}

// run now
run().catch(console.error);


/**
 * Search
 * @param {String} q
 * @return {Promise<{title:String, content:String}[]>}
 */
exports.searchBooks = async (q) => {
    // TODO: could queue the task for when client is connected in real production app
    // if (!isConnected)
    //     throw new Error('ElasticSearch is still not ready');

    const response = await client.search({
        index: INDEX,
        // this is an 'article' document type (ElasticSearch 6 support now only one type per index) - and can be skipped
        // type: '_doc',
        body: {
            size: 200,
            from: 0,
            query: {
                match: {
                    // search in the 'text' field for the 'q' query-string
                    // text: q

                    // use the "standard" analyzer, otherwise it would use the custom
                    // "autocomplete" analyser by default and query using the edge n-grams of the query text.
                    // This would lead to unwanted results, since we want to search
                    // for the text (for example) "Yahoo" specifically, and not for "y", or "ya" or "yah" or "yaho" and "yahoo".
                    text: {
                        query: q,
                        analyzer: 'standard',

                        // TODO: create such analyzer
                        // analyzer: 'autocomplete',
                    }
                }
            }
        }
    });

    // ''response' is { statusCode, headers, body, warnings, meta }
    // 'body' = { took, timeout, _shards, hits }
    // and the real found items are in the 'hits' = { total, max_score, hits },
    // so 'response.body.hits.hits'

    // this is [ {_id, _index, _type, _score, _source}, ... ]
    const hits = response.body.hits.hits;

    // get just the source articles
    const sources = hits.map(obj => obj._source);

    return sources;
};

/**
 * Add new
 * @param {String} title
 * @param {String} content
 * @return {Promise}
 */
exports.addBook = async (title, content) => {

};

