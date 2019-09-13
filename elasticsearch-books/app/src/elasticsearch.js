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
        console.trace('ElasticSearch cluster is down!');
    } else {
        isConnected = true;
        console.log('ElasticSearch cluster is up and running');
    }
});



/**
 * @param {String} q
 * @return {Promise<{id:String,title:String,content:String}[]>}
 */
exports.searchArticles = async (q) => {
    // TODO: could queue the task for when client is connected in real production app
    if (!isConnected)
        throw new Error('ElasticSearch is still not ready');

    const response = await client.search({
        index: 'website_opt',
        // this is an 'article' document type (ElasticSearch 6 support now only one type per index) - an d can be skipped
        // type: '_doc',
        body: {
            size: 200,
            from: 0,
            query: {
                match: {
                    // search in the 'title' field for the 'q' query-string
                    // title: q,

                    // use the "standard" analyzer, otherwise it would use the custom
                    // "autocomplete" analyser by default and query using the edge n-grams of the query text.
                    // This would lead to unwanted results, since we want to search
                    // for the text (for example) "Yahoo" specifically, and not for "y", or "ya" or "yah" or "yaho" and "yahoo".
                    title: {
                        query: q,
                        analyzer: 'standard',
                    }
                }
            }
        }
    });

    // this is [ {_id, _index, _type, _score, _source}, ... ]
    const hits = response.hits.hits;

    // get just the source articles
    const articles = hits.map(obj => obj._source);

    return articles;
};
