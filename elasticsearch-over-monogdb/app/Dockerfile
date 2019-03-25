# base image with specified node version (node:<version>)
FROM node:10

WORKDIR /app

# when building an image we can choose whether to be for production or development
# by passing --build-arg to 'docker build ....' or in docker-compose (which will be 'development' by default)
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

ENV NPM_CONFIG_LOGLEVEL=info

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
CMD ["npm", "start"]

