# This is a shebang line that tells the system which program ( bash in this case ) should interpret the commands
#!/bin/bash

# Tells the shell to exit immediately if a command fails
set -e

# This sets the variables for the database server, password, and database name.
SERVER="ally-test-pharmaGo";
PW="superSecretPassword789";
DB="testapp";


# This command kills and removes the old docker instance, and then starts a 
# new instance of the database server with the specified password, port, and database name
echo "echo stop & remove old docker [$SERVER] and starting new fresh instance of [$SERVER]"
(docker kill $SERVER || :) && \
  (docker rm $SERVER || :) && \
  docker run --name $SERVER -e POSTGRES_PASSWORD=$PW \
  -e PGPASSWORD=$PW \
  -p 5432:5432 \
  -d postgres

# wait for postgres to start
echo "sleep wait for pg-server [$SERVER] to start";
sleep 3;

# create the db 
echo "CREATE DATABASE $DB ENCODING 'UTF-8';" | docker exec -i $SERVER psql -U postgres
echo "\l" | docker exec -i $SERVER psql -U postgres