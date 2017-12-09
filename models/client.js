'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClientSchema = Schema({
  name: String,
  surname: String,
  email: String,
  phone: String
});

module.exports = mongoose.model('Client',ClientSchema);
