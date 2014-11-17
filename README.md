node-powershell-interop
=======================
# Overview

This project illustrates the use of edgeJS as glue code between nodeJS and Powershell.  It is intended to run in Windows, so testing/development will require a Windows machine configured according to [this Nexus page](https://nexus.connectsolutions.com/display/KNOW/Setup+NodeJS-Powershell+interop+for+Lync).

The project is intended to run in conjunction with Nick's [rabbitmq-proto](https://github.com/nickcs/rabbitmq-proto).

# Getting Started

Once both projects are installed, start up the rabbitmq-proto first following Nick's directions.

You will need to create a default.js config file in a config directory (this was gitignore'd for security reasons) that has the following lines with values filled in:
```
exports.rpc_user = ''; // admin account on Lync provisioning server
exports.rpc_password = '';
exports.rpc_server = ''; // FQDN of Lync provisioning server

exports.amqp_host = '172.16.45.1'; // IP of the computer where rabbitmq-proto is running
exports.amqp_port = '3000'; // port of rabbitmq-proto instance
```

Then open a command window in the node-powershell-interop directory and type
```
node rabbit
```
You should then be able to send curl commands to the rabbitmq-proto instance and have the interop process pick up messages to the "users" exchange, like so:

create a user:
```
curl -X POST -H "Content-Type: application/json" \
-d '{"action":"create","container": "e911test","upn": "misskatonic.e911test@cslab3.us","email": "misskatonic@mailinator.com","displayName": "Miss Katonic","description": "misskatonic.e911test@cslab3.us","givenName": "Miss","surName": "Katonic","password": "Admin!@#$","phone": "7119484822","mobilePhone": "7119484822"}' \
http://localhost:3000/users
```
get the user:
```
curl -X POST -H "Content-Type: application/json" \
-d '{"container": "e911test","upn": "misskatonic.e911test@cslab3.us"}' \
http://localhost:3000/users
```
delete the user:
```
curl -X POST -H "Content-Type: application/json" \
-d '{"action":"destroy","container": "e911test","upn": "misskatonic.e911test@cslab3.us"}' \
http://localhost:3000/users
```

Each of these will fire status messages to the "logs" exchange which will be picked up and printed by Nick's logging microservices.
