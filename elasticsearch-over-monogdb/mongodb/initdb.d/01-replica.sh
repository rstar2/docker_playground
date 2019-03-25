# Because accessing environment variables is not possible from the JavaScript files it has to be ".sh" on
# Note ".sh" files are just excecuted by the mongo conatiner on startup,
# while ".js" files are opassed to the mongo shell (e.g. mongo ... $MONGO_INITDB_DATABASE file.js)

hostname=${MONGO_RS_HOST:-$(hostname)}

# Call the real JS file but it should NOT be with ".js" extension otherwise it will be executed also
mongo 127.0.0.1:27017 --eval "var MONGO_RS_HOST = '$hostname'" /docker-entrypoint-initdb.d/01-replica-js


# Onother option for using a shell script that calls the mongo shell:
# mongo <<EOF
# use admin
# db.createUser({
#   user:  '$ENV_APP_SERVER_USERNAME',
#   pwd: '$ENV_APP_SERVER_PW',
#   roles: [{
#     role: 'readWrite',
#     db: 'dummydb'
#   }]
# })
# EOF
