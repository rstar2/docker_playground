#!/bin/bash

mongo="${MONGO:-elasticsearch-mongodb--mongodb:27017}"
elasticsearch="${ELASTICSEARCH:-elasticsearch-mongodb--es:9200}"

exec ./wait-for-it.sh ${mongo} -- ./wait-for-it.sh ${elasticsearch} -- npm run start:dev
