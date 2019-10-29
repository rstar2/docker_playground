## Testing the docker containers

### Testing the client app

```sh
docker build -t vea-client --target client-app .
docker run -it --rm  vea-client /bin/sh
```

### Testing the server app

```sh
docker build -t vea-server --target node-server .
docker run -it --rm  vea-server /bin/sh
```

### Testing the multi-stage docker build

```sh
docker build -t vea .
docker run -it --rm  vea /bin/sh
```

### Env variables

There should be :

- .env          (For production usage)
- .env.local    (For dev/local usage)

## Deploying to AWS

