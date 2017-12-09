'use strict'
//sistema de ficheros
var path = require('path');
var fs = require('fs');
//paginate
var mongoosePaginate=require('mongoose-pagination');
//models
var Client = require('../models/client');

function getClient(req, res)
{
  var clientId=req.params.id;
  Client.findById(clientId,(err, client)=>{
    if(err)
    {
      res.status(500).send({message: 'Error en la petición...'});
    }
    else
    {
      if(!client)
      {
        res.status(404).send({message: 'El cliente no existe'});
      }
      else
      {
        res.status(200).send({client});
      }
    }
  });
}

function saveClient(req,res)
{
  var client = new Client();
  var params = req.body;
  client.name=params.name;
  client.surname = params.surname;
  client.email = params.email;
  client.phone=params.phone;

  client.save((err, clientStored)=>{
    if(err)
    {
      res.status(500).send({message: 'Error al guardar el cliente'});
    }
    else
    {
      if(!clientStored)
      {
        res.status(404).send({message: 'El cliente no ha sido guardado'});
      }
      else
      {
          res.status(200).send({client: clientStored});
      }
    }
  });
}

function getClients(req,res)
{
  if(req.params.page)
  {
    var page = req.params.page;
  }
  else
  {
    var page = 1;
  }
  var itemsPerPage=3;
  Client.find().sort('name').paginate(page,itemsPerPage,function(err,clients,total){
    if(err)
    {
      res.status(500).send({message: 'Error en la petición'});
    }
    else
    {
        if(!clients)
        {
          res.status(404).send({message: 'No hay clientes'});
        }
        else
        {
          res.status(200).send({
            total_items:total,
            clients: clients
          });
        }
    }
  });
}

function updateClient(req,res)
{
  var clientId=req.params.id;
  var update = req.body;

  Client.findByIdAndUpdate(clientId,update,(err,clientUpdated)=>{
    if(err)
    {
      res.status(500).send({message: 'Error al actualizar cliente'});
    }
    else
    {
        if(!clientUpdated)
        {
          res.status(404).send({message: 'El Cliente No Ha sido actualizado'});
        }
        else
        {
          res.status(200).send({client:clientUpdated});
        }
    }
  });
}

function deleteClient(req,res)
{
  var clientId=req.params.id;
  Client.findByIdAndRemove(clientId,(err,clientRemoved)=>{
    if(err)
    {
      res.status(500).send({message: 'Error al eliminar cliente'});
    }
    else
    {
      if(!clientRemoved)
      {
        res.status(404).send({message: 'El Cliente No Ha sido eliminado'});
      }
      else
      {
        res.status(200).send({client:clientRemoved});
      }
    }
  });
}



module.exports={
  getClient,
  saveClient,
  getClients,
  updateClient,
  deleteClient
};
