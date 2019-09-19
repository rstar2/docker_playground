const elasticsearch = require('@elastic/elasticsearch');
const URL = process.env.ELASTICSEARCH_URL;
const INDEX = process.env.ELASTICSEARCH_INDEX_NAME  || 'index';

// instantiate an Elasticsearch client
const client = new elasticsearch.Client({
    // nodes: [URL], // if connecting to a cluster
    node: URL,
    pingTimeout: 1000,
    requestTimeout: 5000,
    maxRetries: 3
});

let isConnected = true;

/**
 * @function checkConnection
 * @returns {Promise<Boolean>}
 * @description Checks if the client is connected to ElasticSearch
 */
async function checkConnection(timeout = 15000) {
    const connect$ = new Promise(async (resolve) => {
        console.log('Checking connection to ElasticSearch...');
        let isConnected = false;
        while (!isConnected) {
            try {
                await client.cluster.health({});
                console.log('Successfully connected to ElasticSearch');
                isConnected = true;
                // eslint-disable-next-line no-empty
            } catch (_) {
            }
        }
        resolve(true);
    });
    const timeout$ = new Promise((_, reject) => setTimeout(reject, timeout));

    return Promise.race([connect$, timeout$]);
}

async function run() {
    try {
        await checkConnection();
        console.log('ElasticSearch server is up and running');

        // create the index now if not already created
        const { body: exists } = await client.indices.exists({
            index: INDEX
        });

        if (!exists) {
            console.log(`Index ${INDEX} - not existing so create it now`);

            await client.indices.create({
                index: INDEX,
                timeout: '5000ms',
                // timeout: '5s',
                body: {
                }
            });

            console.log(`Index ${INDEX} - created`);

            console.log(`Index ${INDEX} - create mappings`);
            // the document swill be {title:String, contents:Sting}
            const schema = {
                title: {
                    type: 'text'
                },
                contents: {
                    type: 'text'
                }
            };

            await client.indices.putMapping({
                index: INDEX,
                body: {
                    properties: schema
                }
            });

            console.log(`Index ${INDEX} - mappings created`);

            await addBook({ title: 'Title demo 1', contents: 'Contents demo 1'});
            console.log(`Index ${INDEX} - added demo data`);
        } else {
            console.log(`Index ${INDEX} is already existing`);
        }
    } catch (err) {
        console.error(err);

        isConnected = false;
    }
}

// run now ElasticSearch initialization code
run().catch(console.error);


async function addBook(book, refresh = true) {
    await client.index({
        index: INDEX,
        body: book,

        // if 'refresh === true' we are forcing an index refresh,
        // otherwise we will not get any result
        // in the consequent search
        refresh
    });
}


/**
 * Search
 * @param {String} q
 * @return {Promise<{title:String, content:String}[]>}
 */
exports.searchBooks = async (q) => {
    if (!isConnected)
        throw new Error('ElasticSearch is still not ready');

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
exports.addBook = addBook;

