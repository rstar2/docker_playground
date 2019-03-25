1. Using a Dockerfile in your Node.js app project :

```
# specify the node base image with your desired version node:<version>
FROM node:10
# replace this with your application's default port
EXPOSE 8080
```

Then build the Docker image and run/create a container from it:

Usage:  docker build [OPTIONS] PATH | URL
-t      - "Name and optionally a tag in the 'name:tag' format"
```
$ sudo docker build -t my-app-image .
```

Usage:  docker run [OPTIONS] IMAGE [COMMAND] [ARG...]
-i      - "Keep STDIN open even if not attached" (same as --interactive)
-t      - "Allocate a pseudo-TTY" (same as --tty)
--rm    - "Automatically remove the container when it exits"
--name  - "Assign a name to the container"
-p      - "Map ports"
```
$ PORT=8080 && sudo docker run -it --rm -p $PORT:$PORT --name my-app-container my-app-image
```

-d      - "Run in daemon mode so it keeps running in the background"
```
$ PORT=8080 && sudo docker run -d -p $PORT:$PORT --name my-app-container my-app-image
```

2. Using Docker Compose :

2.1. Make Docker Compose use the build file 'Dockerfile' and just run it 
'Dockerfile' :

docker-compose-build.yml
------------------------
```
version: "2"
services:
  app:
    build: .
    environment:
      - NODE_ENV=production
      - PORT=8080
    ports:
      - 8080:8080
```

-f   - "Specify an alternate compose file (default: docker-compose.yml)"
```
$ sudo docker-compose -f docker-compose-build.yml up
```

2.2.Make Docker compose build the containers alone, e.g. the docker instructions will be configured by Docker Compose:

docker-compose.yml
------------------------
version: "2"
services:
  app:
    image: node:10
    working_dir: /app
    environment:
      - NODE_ENV=production
      - PORT=8080
    volumes:
      - ./:/app
    ports:
      - 8080:8080
    command: "npm start"


```
$ sudo docker-compose up
```

Docker Compose copies your current directory (including node_modules) to the container. It assumes that your application has a file named package.json defining start script.

3. Running a single Node.js script :

```
$ docker run -it --rm --name my-running-script -v "$PWD":/usr/src/app -w /usr/src/app node:8 node your-daemon-or-script.js
```


# !!!!. NOTE for Windows 7:
Accessing exposed and mapped ports is not possible on "localhost"
Should use the ```$ docker-machine ip``` to get the docker network IP address