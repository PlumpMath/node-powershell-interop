// module for running this all in a browser using iisnode
// not really recommended; lots of setup to do

var express = require('express');
var app = express();
var edge = require('edge');
var config = require('config');
var user = require('./lib/user');
var request = require('request');


app.get('/node/express/myapp/create', function (req, res) {

  var input = {
    rpc_user : config.rpc_user,
    rpc_password : config.rpc_password,
    rpc_server : config.rpc_server,

    container: 'e911test',
    upn: 'misskatonic.e911test@cslab3.us',
    email: 'misskatonic@mailinator.com',
    displayName: 'Miss Katonic',
    description: 'misskatonic.e911test@cslab3.us',
    givenName: 'Miss',
    surName: 'Katonic',
    password: 'Admin!@#$',
    phone: '7119484822',
    mobilePhone: '7119484822'

  }

  user.create(input, function (error, result) {
      // if (error) throw error;
      res.send(result[0]);
      //console.log(result[0]);
  });

});

app.get('/node/express/myapp/get', function (req, res) {

  var input = {
    rpc_user : config.rpc_user,
    rpc_password : config.rpc_password,
    rpc_server : config.rpc_server,

    container: 'e911test',
    upn: 'tom.cannon.e911test@cslab3.us'

  };

request({
  method:'POST',
    headers: {'content-type' : 'application/json'},
    url:     'http://' + config.amqp_host + ':' + config.amqp_port + '/logs',
    json: {error:'error', message:'{test:"message from windows"}'}

});

  // user.get(input, function (error, result) {
  //     res.send(result[0]);
  // });

});

app.get('/node/express/myapp/delete', function (req, res) {

  var input = {
    rpc_user : config.rpc_user,
    rpc_password : config.rpc_password,
    rpc_server : config.rpc_server,

    container: 'e911test',
    upn: 'misskatonic.e911test@cslab3.us'

  };

  user.delete(input, function (error, result) {
      // if (error) throw error;
      res.send(result[0]);
      //console.log(result[0]);
  });

});

app.listen(process.env.PORT);
