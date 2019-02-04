#!/bin/bash

mongo="${MONGO:-mongo:27017}"
elasticsearch="${ELASTICSEARCH:-elasticsearch:9200}"

mongo-connector --auto-commit-interval=0 -m ${mongo} -t ${elasticsearch} -d elastic2_doc_manager
