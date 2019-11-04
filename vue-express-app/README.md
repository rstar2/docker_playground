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

1. Create an AWS ECR (registry repository) for this image
   URI is _592755008084.dkr.ecr.us-east-1.amazonaws.com/magic-media/vue-express-app_

2. Push the local Docker image to it
    1. Login to AWS to be able to use the AWS CLI
        1. Authorize the AWS CLI
        2. Let Docker login to the AWS ECR repository (```aws ecr get-login``` is just printing the needed dDocker command to be executed)
        ```$(aws ecr get-login --no-include-email --region us-east-1)```
    2. Build the local Docker image
         ```docker build --build-arg VUE_APP_API=/api -t rstardev/vue-express-app:1.0 . ```
    3. Tag it
        ```docker tag rstardev/vue-express-app:1.0 592755008084.dkr.ecr.us-east-1.amazonaws.com/magic-media/vue-express-app:1.0```
    4. Push to the AWS ECR repository
        ```docker push 592755008084.dkr.ecr.us-east-1.amazonaws.com/magic-media/vue-express-app```

3. Create a AWS ECS cluster

4. Create AWS ECS Task Definitions
    Specify container - which image to pull from, env variables and etc.

5. Create AWS ECS Service from this Task Definitions - No need for load balancing, auto-scaling, service discovery and etc.


