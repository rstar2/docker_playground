FROM debian:jessie

# Install just the MongoDb client
RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 9DA31620334BD75D9DCB49F368818C72E52529D4
RUN echo "deb http://repo.mongodb.org/apt/debian jessie/mongodb-org/4.0 main" >> /etc/apt/sources.list.d/mongodb-org-4.0.list
RUN apt-get update && \
    apt-get install -y mongodb-org-shell mongodb-org-tools
