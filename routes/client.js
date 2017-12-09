'use strict'

var express = require('express');
var ClientController= require('../controllers/client');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');


api.get('/client/:id',md_auth.ensureAuth, ClientController.getClient);
api.post('/client',md_auth.ensureAuth, ClientController.saveClient);
api.get('/clients/:page?',md_auth.ensureAuth, ClientController.getClients);
api.put('/client/:id',md_auth.ensureAuth, ClientController.updateClient);
api.delete('/client/:id',md_auth.ensureAuth, ClientController.deleteClient);
module.exports = api;
