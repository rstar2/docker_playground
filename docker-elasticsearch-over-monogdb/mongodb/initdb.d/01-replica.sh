# Because accessing environment variables is not possible from the JavaScript files it has to be ".sh" on
# Note ".sh" files are just excecuted by the mongo conatiner on startup,
# while ".js" files are opassed to the mongo shell (e.g. mongo ... $MONGO_INITDB_DATABASE file.js)

# Call the real JS file but it should NOT be with ".js" extension otherwise it will be executed also
mongo --eval "var MONGO_RS_HOST = '$MONGO_RS_HOST'" 01-replica-js
