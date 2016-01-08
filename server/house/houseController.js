var express = require('express');
var helpers = require('./../db/helpers.js');

module.exports = {
  address: function(req, res){
    var homeName = req.body.homeName;
    var address = req.body.address;
    var houseData = {};
    houseData['address'] = address;
    houseData['name'] = homeName;
    helpers.addHome(houseData)
           .then( function(result){
             console.log('SUCCESS INSIDE ADDRESS');
             res.status(200).send(result);
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
               res.status(200).send(results);
             })
             .catch( function(err){
               console.log('ERROR INSIDE BUILD', err);
               res.sendStatus(404);
             })
    }
  },
  users: function(req, res){

  },
  retrieveHome: function(req, res){
    console.log(req.body, "RETRIEVEHOME REQBODY");
    helpers.getHome(req.body)
           .then(function(resultData){
             console.log('SUCCESS INSIDE RETRIEVEHOME');
             res.status(200).send(resultData);
           })
           .catch(function(err){
             console.log('ERROR INSIDE BUILD');
             res.sendStatus(404);
           })
  }
}
