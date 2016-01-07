var express = require('express');
var helpers = require('./../db/helpers.js');

module.exports = {
  address: function(req, res){
    var address = req.body.address;
    var houseData = {};
    houseData['address'] = address;
    helpers.addHome(houseData)
           .then( function(result){
             console.log('SUCCESS INSIDE ADDRESS');
             res.status(200).send(res.body);
           })
           .catch( function(err){
             console.log('ERROR INSIDE ADDRESS', err);
           })
  },
  build: function(req, res){
    var roomArray = req.body.roomArray;
    var houseData = {};
    houseData['address'] = req.body.address;
    for(var i = 0; i< roomArray.length; i++){
      helpers.addRoom(roomArray[i], houseData)
             .then( function(results){
               console.log('SUCCESS INSIDE BUILD');
               res.status(200).send(res.body);
             })
             .catch( function(err){
               console.log('ERROR INSIDE BUILD', err);
               res.sendStatus(404);
             })
    }
  }
}
