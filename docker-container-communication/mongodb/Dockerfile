FROM mongo

# Default value can be set also if none argument is passed
ARG PORT=8081

# set environment variables
ENV MONGO_INITDB_ROOT_USERNAME root
ENV MONGO_INITDB_ROOT_PASSWORD example
# access the ARG variable PORT and set/elevate it as an env variable
ENV PORT $PORT

# Make port available to the world outside this container
EXPOSE $PORT

RUN echo 'Start mongo listening on port' $PORT


