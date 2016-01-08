var helpers = require('./../db/helpers.js');
var Promise = require('bluebird');
var emailCtrl = require('./../email/emailController.js');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

module.exports = {
  postEvent: function(req,res) {
    // console.log("HERE IS REQ RAWRR", req.body);
    var eventObj = { 
      name: req.body.eventName, 
      description: req.body.eventDescription,
      date: req.body.eventDate, 
      duration: req.body.eventDuration
    };

    var userObj = {
      username: req.token.username 
    };

    var homeObj = {
      address: ''
    };
//==============SINGLE ROOMNAME DEFINED HERE 
    var eventRoom = req.body.roomName;
    var eventRoomArr = [];
//================================================
    var emailData = { 
      userWhoBookedARoom: req.token.username,
      housemateEmails: [],
      // houseName: '',
      roomName: eventRoom,
      eventDate: eventObj.date
    };

    helpers.getHome(userObj)
      .then(function(user) {
        homeObj.id = user.get('HomeId');
    });

    helpers.getRooms(homeObj)
      .then(function(roomsArray) {
        console.log("HERE IS ROOMSARRAY", roomsArray);
        [].forEach.call(roomsArray, function(room) {
          if(room.get('name') === eventRoom) {
            eventRoomArr.push(room);
          }
        })

        helpers.addEvent(eventObj, userObj, homeObj, eventRoomArr)
          .then(function(response) {
            res.status(200).send('success! Event added. ');
          });
    });

    helpers.getHousemateEmails(homeObj)
      .then(function(emailAddresses) {
        emailData.housemateEmails = emailAddresses;
      //======v  send email!  v======//
        emailCtrl.transport;
        emailCtrl.sendEmail(emailData);
        res.status(200).send('success! Emails sent to housemates.');
    });
  
  },



  loadEvents: function(req,res) {
    var userObj = {
      username: req.token.username 
    };

    var homeObj = {
      address: '',
      id: ''
    };

    helpers.getUser(userObj)
      .then(function(user) {
        // console.log("HERE IS USER", user);
        homeObj.id = user.get('HomeId');
      });    

    helpers.getHomeById(homeObj)
      .then(function(resHome) {
        homeObj.id = resHome.get('id');
      });

    var optionsObj = {
      home: homeObj
    };

    helpers.getEvents(optionsObj)
      .then(function(eventsArray) {
        console.log("HERE IS EVENTS ARRAY RETURNED FROM DB", eventsArray);
        //NOTE: depending on the consolelog above, may need to modify the array before sending it back
        res.status(200).send(eventsArray);
      })

  }
}




        //-------- v nodeMailer v -------- 
        
        //DB helper function call on user table to findAll users with req.body.houseID; put their emails into an array
        //call toString() on that array
        //on the emailData object below, set the value of housemateEmails to the name of that string of emails
      // var sendEmail = function() {
      //   var emailData = { 
      //   // take this info from req.body once we know how it will be formatted, with the exception of housemateEmails, which we need to query the DB for
      //     userWhoBookedARoom: '',
      //     housemateEmails: [],
      //     houseName: '',
      //     roomName: '',
      //     eventDate: ''
      //   };
      //   emailCtrl.transport;
      //   emailCtrl.sendEmail(emailData);
      // }

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

