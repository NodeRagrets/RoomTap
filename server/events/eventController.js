var eventModel = require('./eventModel.js');
var Promise = require('bluebird');
Promise.promisifyAll(require('mongoose'));

module.exports = {
  postEvent: function(req,res) {
    //checks if event already exists
    eventModel.findOne({ 
      'eventDate': req.body.dibEvent.eventDate,
      'rooms': req.body.dibEvent.rooms
    }).then(function(result) {
      if(result){
        res.status(403).send({ result: false });
      } else {
        var storeEvent = eventModel.create.bind(eventModel);
        storeEvent(req.body.dibEvent);
        res.status(200).send({ result: true });
      }
    });
  },

  getEvents: function(req,res) {
    eventModel.find({'eventDate' : { $gte : new Date()} })
      .sort({eventDate: 1})
      .then(function(booked) {
        return res.status(200).send(booked);
      });
  }
};
