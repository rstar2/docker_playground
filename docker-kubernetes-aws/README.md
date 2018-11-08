See: https://dev.to/adnanrahic/containers-vs-serverless-from-a-devops-standpoint-e4n

# 1. Create a simple Express app

# 2. Create Dockerfile that can run the app in a container
```
$ docker build . -t <docker_hub_username>/<image_name>
```
 
## 2.1. Just run a container to check it's working
    ```
    $ sudo docker run -it --rm -p 3000:3000 --name <docker_hub_username>-<image_name> <docker_hub_username>/<image_name>
    ```

# 3. Push to a Docker container repository hub

# 4. Configure Kubernetes