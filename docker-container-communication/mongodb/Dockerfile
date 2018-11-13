FROM mongo

# These variables, used in conjunction, create a new user and set that user's password.
# This user is created in the admin authentication database and given the role of root.
# Both variables are required for a user to be created.
# If both are present then MongoDB will start with authentication enabled: mongod --auth.
# ENV MONGO_INITDB_ROOT_USERNAME root
# ENV MONGO_INITDB_ROOT_PASSWORD example

# specify the name of a database to be used for creation scripts
ENV MONGO_INITDB_DATABASE docker-my-cc

# initialize the DB
COPY docker-entrypoint-initdb.d /docker-entrypoint-initdb.d/

RUN echo 'Start mongo listening on port' 27017


