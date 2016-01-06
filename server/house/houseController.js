var express = require('express');
var helpers = require('./../db/helpers.js');

module.exports = {
  build: function(req, res){
    if(!req.body){
      res.sendStatus(404)
    }
    res.status(200).send(req.body)
  }
}
