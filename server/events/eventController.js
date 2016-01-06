var eventModel = require('./eventModel.js');
var Promise = require('bluebird');
var emailCtrl = require('./../email/emailController.js');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

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
        //-------- v nodeMailer v -------- 
        
        //DB helper function call on user table to findAll users with req.body.houseID; put their emails into an array
        //call toString() on that array
        //on the emailData object below, set the value of housemateEmails to the name of that string of emails

        var emailData = { //take this info from req.body once we know how it will be formatted, with the exception of housemateEmails, which we need to query the DB for
          userWhoBookedARoom: '',
          housemateEmails: [],
          houseName: '',
          roomName: '',
          eventDate: ''
        };

        emailCtrl.transport;
        emailCtrl.sendEmail = function(emailData);

        //-------- ^ nodeMailer ^ --------         
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
