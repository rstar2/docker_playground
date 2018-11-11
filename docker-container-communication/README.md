	<!-- git@github.com:mchaov/the-collector.git -->

1. Start Mongo container
- Create image
```
$ sudo docker build -t my-cc-mongo-image mongodb/
```
- Create and start a container from it
```
$ sudo docker run -d --name my-cc-mongo my-cc-mongo-image
```

  - To test it from outside the docker host - we need first the Mongo container's IP
  ```
  $ MONGODB_IP=$(sudo docker inspect -f '{{.NetworkSettings.Networks.bridge.IPAddress}}' my-cc-mongo)
  $ mongo -host $MONGODB_IP
  ```
  or in one line:
  ```
  $ mongo -host $(sudo docker inspect -f '{{.NetworkSettings.Networks.bridge.IPAddress}}' my-cc-mongo)
  ```
  or if in ~/.bashrc there's a function named "docker-ip"
  ```
  docker-ip() {
     sudo docker inspect -f '{{.NetworkSettings.Networks.bridge.IPAddress}}' "$@"
  }
  ```
  then :
  ```
  $ mongo -host $(docker-ip my-cc-mongo)
  ```

  - To connect to it from another container
  ```
  $ sudo docker run -it --rm    --link my-cc-mongo:mongodb         mongo        mongo --host mongodb test
  ```                                      |                          |                |
  "link the my-cc-mongo ip as 'mongodb' host in this container"   "mongo-image"    "mongo-client-cmd"




2. Start Node app container that will connect to the Mongo one
- Create image
```
$ sudo docker build -t my-cc-app-image nodeapp/
```
- Create and start a container from it
```
$ sudo docker run -d --name my-cc-app my-cc-app-image
```
