
## Run ElasticSearch, MongoDb, ClientApp and Nginx with docker-compose:

``` $ docker-compose up ```

Note : for Windows in order PWD to work it must be set like this: ``` $ set PWD=%cd% ```

## Configure a ElasticSearch index

1. Will use the name 'website_opt' (optimized) as later the MongoDB collection 'website' will be imported in ElasticSearch into the index also called 'website'

2. There's a startup configuration script in elasticsearch/config/setup.sh that will create this index automatically

## Importing from MongoDB into ElasticSearch

> Inspired/Learned by : https://medium.com/@xoor/indexing-mongodb-with-elasticsearch-2c428b676343

