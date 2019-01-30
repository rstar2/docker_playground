#!/bin/sh

# wait for Elasticsearch to start, then run the setup script to
# create and configure the index.
exec /usr/share/elasticsearch/utils/wait-for-it.sh localhost:9200 -- /usr/share/elasticsearch/config/setup.sh &
exec $@
