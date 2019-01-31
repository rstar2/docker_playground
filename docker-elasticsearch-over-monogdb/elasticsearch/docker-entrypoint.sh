#!/bin/sh

# execute as background task that waits for Elasticsearch to start,
# and then runs the setup script to create and configure the index.
exec /usr/share/elasticsearch/utils/wait-for-it.sh localhost:9200 -- /usr/share/elasticsearch/setup/setup.sh &

# this will start the CMD which is by default 'elasticsearch'
exec $@
