var helpers = require('./../db/helpers.js');
var Promise = require('bluebird');
var emailCtrl = require('./../email/emailController.js');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

module.exports = {
  postEvent: function(req,res) {
    //checks if event already exists
    var eventObj = { // got it!
      name: '', 
      description: '',
      date: '', 
      duration: ''
    };

    var userObj = {
      username: '', //jwt
    };

    //query DB for username
    var homeObj = {
      address: ''
    };

    //req.body.data.roomNames
    //
    var roomArray = []; //full of objects
    

    helpers.getRooms()
    
    helpers.addEvent().then(function(){})
  },

  loadEvents: function(req,res) {
    helpers.getEvents().then(function(){})
  }
}

    //--------- MONGO TRASH FUNCTION BELOW ---------//
    // { 
    //   'eventDate': req.body.eventDate,
    //   'rooms': req.body.rooms
    // }).then(function(result) {
    //   if(result){
    //     res.status(403).send({ result: false });
    //   } else {
    //     var storeEvent = eventModel.create.bind(eventModel);
    //     storeEvent(req.body.dibEvent);
      //   res.status(200).send({ result: true });
      //     }
      //   });
      // },
    //--------- END MONGO TRASH FUNCTION ---------//



        //-------- v nodeMailer v -------- 
        
        //DB helper function call on user table to findAll users with req.body.houseID; put their emails into an array
        //call toString() on that array
        //on the emailData object below, set the value of housemateEmails to the name of that string of emails

        // var emailData = { 
        //take this info from req.body once we know how it will be formatted, with the exception of housemateEmails, which we need to query the DB for
        //   userWhoBookedARoom: '',
        //   housemateEmails: [],
        //   houseName: '',
        //   roomName: '',
        //   eventDate: ''
        // };

        // emailCtrl.transport;
        // emailCtrl.sendEmail(emailData);

        //-------- ^ nodeMailer ^ --------         
        

  //--------- MONGO TRASH FUNCTION BELOW ---------//
  // getEvents: function(req,res) {
  //   eventModel.find({'eventDate' : { $gte : new Date()} })
  //     .sort({eventDate: 1})
  //     .then(function(booked) {
  //       return res.status(200).send(booked);
  //     });
  // }
  //--------- END MONGO TRASH FUNCTION ---------//

