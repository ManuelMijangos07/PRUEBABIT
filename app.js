'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//cargar rutaas
var user_routes = require('./routes/user');

var client_routes = require('./routes/client');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//configrurar cabeceras http
app.use((req,res,next)=>{
  res.header('Access-Control-Allow-Origin','*');
  res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods','GET,POST,OPTIONS,PUT,DELETE');
  res.header('Allow','GET,POST,OPTIONS,PUT,DELETE');

  next();
});
//rutas basea

app.use('/api',user_routes);

app.use('/api',client_routes);
module.exports = app;
