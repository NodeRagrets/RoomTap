var helpers = require('./../db/helpers.js');
var Promise = require('bluebird');
var emailCtrl = require('./../email/emailController.js');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

module.exports = {
  postEvent: function(req,res) {
    //NOTE: we'll need to 
    console.log("HERE IS REQ", req.body);
    var eventObj = { // got it! 
      name: req.body.data.eventName, 
      description: req.body.data.eventDescription,
      date: req.body.data.eventDate, 
      duration: req.body.data.eventDuration
    };

    var userObj = {
      username: req.token.data.token.username 
    };


    var homeObj = {
      address: ''
    };

    // helpers.getHome()

    //query user table in DB for username to get HomeId
    helpers.getHome(userObj)
      .then(function(user) {
        homeObj.id = user.get('HomeId');
      });
    //pass all completed objects to addEvent
    helpers.getRooms(homeObj)
      .then(function(roomsArray) {
        console.log("HERE IS ROOMSARRAY", roomsArray);
        //NOTE: need to console log roomsArray to know what's on it, to filter for the roomnames that came in on req.body.data.roomNames
        helpers.addEvent(eventObj, userObj, homeObj, roomsArray);

        //INSERT NODEMAILER CODE HERE 

      });
  },



  loadEvents: function(req,res) {
    var userObj = {
      username: '' //jwt 
    };

    var homeObj = {
      address: ''
    };

    helpers.getUser(userObj)
      .then(function(user) {
        homeObj.address = user.get('HomeId');
      });    

    helpers.getEvents(homeObj)
      .then(function(eventsArray) {
        console.log("HERE IS EVENTS ARRAY RETURNED FROM DB", eventsArray);
        //NOTE: depending on the consolelog above, may need to modify the array before sending it back
        res.status(200).send(eventsArray);
    })

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

