
# Using plain Docker CLI
1. Create local network

```
$ docker network create elasticnet
```

2. Run Elasticsearch (https://www.elastic.co/guide/en/elasticsearch/reference/current/docker.html)

```
$ docker run -d --name elasticsearch --net elasticnet -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" elasticsearch:6.5.3
```

 - Check if running correctly:  ``` $ curl http://localhost:9200/_cat/health ``` or ``` $ curl http://host-ip:9200/_cat/health ```
 - Can pass configuration by mounting a local custom config file: ``` -v full_path_to/custom_elasticsearch.yml:/usr/share/elasticsearch/config/elasticsearch.yml ```
 - By default Kibana searches for http://elasticsearch:9200 so naming the ElasticSearch container _elasticsearch_ and using the same network (in this case _elasticnet_) Kibana will find it easily

2. Run Kibana (https://www.elastic.co/guide/en/kibana/current/docker.html and https://hub.docker.com/_/kibana/)

```
$ docker run -d --name kibana --net elasticnet -p 5601:5601 kibana:6.5.3
```

 - In order Kibana to start correctly the ElasticSearch server (in this case the other docker container should be running correctly). By default Kibana searches for ... so the containers must be able to talk (either on the same network or explicitly linked  _--link elasticsearch:elasticsearch_ or explicitly passed the ElasticSearch URL _-e "ELASTICSEARCH_URL=http://elasticsearch:9200"_)
 - Kibana can be accessed by browser via ``` http://localhost:5601 ``` or ``` http://host-ip:5601 ```
 - Can pass configuration by mounting a local custom config file:
 ``` -v full_path_to/custom_kibana.yml:/usr/share/kibana/config/kibana.yml ```


# Using docker-compose.yml
> TODO - Check the docker-compose.yml
