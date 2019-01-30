#!/bin/sh

echo Initiating Elasticsearch
# move to the directory of this setup script
echo $(dirname "$0")

# create a new index with the settings in index_articles.json
curl -X PUT http://localhost:9200/articles \
     -H 'Content-Type: application/json' \
     -d @index_articles.json
