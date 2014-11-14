// module for hooking up to a rabbitmq host and doing create/read/delete user
//
// just run "node rabbit"

var amqp = require('amqp');
var config = require('config');
var connection = amqp.createConnection({host: config.amqp_host});
var request = require('request');
var user = require('./lib/user');

var sendLog = function(level, message) {
  request({
    method: 'POST',
    headers: {'content-type' : 'application/json'},
    url: 'http://' + config.amqp_host + ':' + config.amqp_port + '/logs',
    json: {level: level, message:'"' + message + '"'}
  });
}

var handleResponse = function(error, result) {
  if (error) {
    console.log("Error");
    sendLog("error", error);
  } else if (result[0]) {
    console.log("Sending data...");
    sendLog("info", result[0]);
  } else {
    console.log("Done, no errors or data");
  }
}

connection.on('ready', function() {
  var options = {
    type: 'fanout',
    autoDelete: false
  }

  connection.exchange('users', options, function(exchange) {
    connection.queue('get', {exclusive: true}, function(queue) {
      queue.bind('users', '');
      queue.subscribe(function(msg){

        msg.rpc_user = config.rpc_user;
        msg.rpc_password = config.rpc_password;
        msg.rpc_server = config.rpc_server;

        if (msg.action == "create") {
          console.log('create user ' + msg.upn + ' in container ' + msg.container);
          sendLog("info",'create user ' + msg.upn + ' in container ' + msg.container);
          user.create(msg, function(error, result) {
            if (!error) {
              sendLog("info", "User " + msg.upn + " created");
            }
            handleResponse(error, result);
          });

        } else if (msg.action == "destroy") {
          console.log('delete user ' + msg.upn + ' from container ' + msg.container);
          sendLog("info",'delete user ' + msg.upn + ' from container ' + msg.container);
          user.destroy(msg, function(error, result) {
            if (!error) {
              sendLog("info", "User " + msg.upn + " deleted");
            }
            handleResponse(error, result);
          });

        } else {
          console.log('get user ' + msg.upn + ' from container ' + msg.container);
          sendLog("info",'get user ' + msg.upn + ' from container ' + msg.container);
          user.get(msg, handleResponse);
        }

      });
    });
  });
});
