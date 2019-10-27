## Testing the docker containers


### Testing the client app

```sh
docker build -t vea-client -f ./DockerfileServer .
docker run -it --rm  vea-client /bin/sh
```

### Testing the server app

```sh
docker build -t vea-server -f ./DockerfileServer .
docker run -it --rm  vea-server /bin/sh
```

### Testing the multi-stage docker build

```sh
docker build -t vea .
docker run -it --rm  vea /bin/sh
```
