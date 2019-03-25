# base image with specified node version (node:<version>)
FROM node:10

# The ARG instruction defines a variable that users can pass at build-time
# to the builder with the docker build command using the --build-arg <varname>=<value> flag.
# Default value can be set also if none argument is passed
ARG PORT=5000

# set environment variables
ENV NPM_CONFIG_LOGLEVEL=info
ENV NODE_ENV=production
# access the ARG variable PORT and set/elevate it as an env variable
ENV PORT $PORT

# application's default port
# only these ports the Docker container is listening to, only they are exposed
RUN echo 'HTTP server will listen by default on' $PORT

# Make port available to the world outside this container
EXPOSE $PORT

WORKDIR /app

# 1. Make this with 2 separate COPY instructions
# so that the "npm install" layer is cached (until any of the 'package.json ...' files is altered)
# see http://bitjudo.com/blog/2014/03/13/building-efficient-dockerfiles-node-dot-js/
# 2. When using COPY with more than one source file,
# the destination must be a directory and end with a / or a \
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install
# note - COPY will ignore files from the .dockerignore files , like node_modules
COPY . .


# only one CMD instuction can be in a Dockerfile
CMD npm start

