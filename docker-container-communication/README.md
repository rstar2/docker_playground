	<!-- git@github.com:mchaov/the-collector.git -->

## This is connecting containers using the old legacy way (e.g. --link).
This way is deprecated now and user-defined network bridge is the recommended way for production use.
Still to learn it:

1. Start Mongo container
- Create image
```
$ sudo docker build -t my-cc-mongo mongodb/
```
- Create and start a container from it
```
$ sudo docker run -d --name my-cc-mongo-1 my-cc-mongo
```

  - To access it from the docker host - we need first the Mongo container's IP
  ```
  $ MONGODB_IP=$(sudo docker inspect -f '{{.NetworkSettings.Networks.bridge.IPAddress}}' my-cc-mongo-1)
  $ mongo -host $MONGODB_IP
  ```
  or in one line:
  ```
  $ mongo -host $(sudo docker inspect -f '{{.NetworkSettings.Networks.bridge.IPAddress}}' my-cc-mongo-1)
  ```
  or if in ~/.bashrc there's a function named "docker-ip"
  ```
  docker-ip() {
     sudo docker inspect -f '{{.NetworkSettings.Networks.bridge.IPAddress}}' "$@"
  }
  ```
  then :
  ```
  $ mongo -host $(docker-ip my-cc-mongo-1)
  ```

  > For Windows - accessing docker network from the Windows Docker host:
  1. Get the docker-host IP with (let's say it's 192.168.99.100): ```$ docker-machine ip```
  2. Add route with
  ```$ route add 172.17.0.0 mask 255.255.0.0 192.168.99.100 -p``` (-p means persist across reboots of the machine )


  - To access it from another container
  ```
  $ sudo docker run -it --rm    --link my-cc-mongo-1:mongodb         mongo        mongo --host mongodb test
  ```

  Where: "link the my-cc-mongo ip as 'mongodb' host in this container"   "mongo-image"    "mongo-client-cmd"


2. Start Node app container that will connect to the Mongo one
- Create image
```
$ sudo docker build -t my-cc-app nodeapp/
```
- Create and start a container from it
```
$ sudo docker run -d -p:3000:5000 --link my-cc-mongo-1:mongodb --env MONGODB_URL=mongodb  --name my-cc-app-1 my-cc-app
```
Here the container's local port 5000 (on which the NodeJS server is listening) is mapped to the port 3000 on the host machine


- Test it on http://localhost:3000/
  Note on Windows it should be like http://<docker-machine-ip>:3000/
