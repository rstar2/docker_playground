#!/bin/sh

# TODO: nc is not found when started from docker-compose

# USAGE Example:
# $ wait-for-mongo.sh elasticsearch-mongodb--mongodb 27017 -- npm run start:dev

set -e

host="$1"
port="$2"

shift 3

cmd="$@"

until nc -z $host $port
do
  >&2 echo "Mongo is unavailable - sleeping"
  sleep 1
done

>&2 echo "Mongo is up - executing command"
exec $cmd
