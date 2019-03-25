#!/bin/bash

echo "ElasticSearch setup script"
# move to the directory of this setup script
cd $(dirname "$0")

# Normally when the script is executed by the ElasticSearch container itself this will be 'localhost'
# as it connects to itself.
# But with the adding of the ELASTICSEARCH_IP/ELASTICSEARCH_PORT variables they could be passed as environment vars
# like when using from Windows docker machine (set ELASTICSEARCH_IP=%docker-machine ip%)
# or when binding the container's port to the host port not on 9200
elasticsearh_ip=${ELASTICSEARCH_IP:-"localhost"}
elasticsearh_port=${ELASTICSEARCH_PORT:-"9200"}
elasticsearch_url=http://$elasticsearh_ip:$elasticsearh_port
echo "Elasticsearch is accessible on: ${elasticsearch_url}"

# check if required index is already existing and if not the create it
# -s --> silien, no progress
# -o --> write to file instad of stdout (in this case ignore with /dev/null)
# -w --> display information on stdout after a completed transfer (there are variables available like http_code)
exists=$(curl --head -s -o /dev/null -w %{http_code} ${elasticsearch_url}/website_opt)
# This should return just the status code - 200 means (index exists)

if (($exists != 200)); then
    echo "Creating and configuring the 'website_opt' index"

    # create a new index with the settings in index_website_opt.json
    curl -X PUT ${elasticsearch_url}/website_opt \
        -H 'Content-Type: application/json' \
        -d @index_website_opt.json

    echo "Created and configured the 'website_opt' index"
else
    echo "Already created 'website_opt' index"
fi

