# Client App
FROM node:lts-alpine as client-app
LABEL authors="Rumen Neshev"
WORKDIR /usr/src/app
COPY ./client/package*.json ./
RUN npm install --silent
# When using COPY with more than one source file, the destination must be a directory and end with a /
COPY ./client ./
# Pass all the necessary env variables
ARG VUE_APP_API
ENV VUE_APP_API $VUE_APP_API
# build the Vue app
RUN npm run build


# Node server
FROM node:lts-alpine as node-server
LABEL authors="Rumen Neshev"
WORKDIR /usr/src/app
COPY ./server/package*.json ./server/
RUN cd server && npm install --production --silent
COPY serve.js .
COPY /server ./server/


# Final image
FROM node:lts-alpine
LABEL authors="Rumen Neshev"
WORKDIR /usr/src/app
# get the node server -- all the files
COPY --from=node-server /usr/src/app ./
# get the client app  -- just the distribution folder
COPY --from=client-app /usr/src/app/dist ./dist/
ARG PORT
ENV PORT $PORT
EXPOSE $PORT
CMD ["node", "serve.js"]
