#!/bin/bash

echo "Starting ElasticSearch setup script"
# execute as background task that waits for Elasticsearch to start,
# and then runs the setup script to create and configure the index.
exec /usr/share/elasticsearch/utils/wait-for-it.sh -t 0 localhost:9200 -- /usr/share/elasticsearch/setup/setup.sh &

echo "Starting ElasticSearch default entrypoint"
# Call the default ElasticSearch entrypoint file allowing again to pass a CMD command
# This is important to call the parent's entrypoint file as it parses necessary
# environment variables and passes them to the 'elasticsearch' Java process,
# so if not doing it setting any ENV var (with docke or docker-compose) will not have any effect
exec /usr/local/bin/docker-entrypoint.sh $@
