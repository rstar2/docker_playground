	<!-- git@github.com:mchaov/the-collector.git -->

1. Start Mongo container
- Create image
```
$ sudo docker build -t my-cc-mongo-image mongodb/
```
- Create and start a container from it
```
$ sudo docker run -it --rm --name my-cc-mongo my-cc-mongo-image
```

2. Start Node app container that will connect to the Mongo one
- Create image
```
$ sudo docker build -t my-cc-app-image nodeapp/
```
- Create and start a container from it
```
$ sudo docker run -d --name my-cc-app my-cc-app-image
```
