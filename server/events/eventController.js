var helpers = require('./../db/helpers.js');
var Promise = require('bluebird');
var emailCtrl = require('./../email/emailController.js');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

module.exports = {
  postEvent: function(req,res) {
    console.log("HERE IS REQ RAWRR BODY BBBB", req.body);
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
      address: '',
      id: req.body.HomeId
    };
//==============SINGLE ROOMNAME DEFINED HERE 
    var eventRoom = req.body.roomName;
    var eventRoomArr = [];
//================================================
    var emailData = { 
      userWhoBookedARoom: req.token.username,
      housemateEmails: [],
      homeName: req.body.homeName,
      roomName: eventRoom,
      eventDate: req.body.eventDate
    };

    //why isn't this working.
    helpers.getHomeById(homeObj.id)
      .then(function(resHome) {
        homeObj.address = resHome.get('address');
      });

    helpers.getRoomsById(homeObj)
      .then(function(roomsArray) {
        console.log("HERE IS ROOMSARRAY", roomsArray);
        roomsArray.forEach(function(room) {
          if(room.get('name') === eventRoom) {
            eventRoomArr.push(room);
          }
        })

        helpers.addEvent(eventObj, userObj, homeObj, eventRoomArr)
          .then(function(response) {
            
            helpers.getHousemateEmails(homeObj)
            .then(function(emailAddresses) {
              emailData.housemateEmails = emailAddresses;
            //======v  send email!  v======//
              emailCtrl.transport;
              emailCtrl.sendEmail(emailData);
              res.status(200).send('success! Emails sent to housemates.');
            }); 
          })
            // console.log("HERE IS RES IN EVENTCONTROLLER", response);// res.status(200).send('success! Event added.');
      })
    
  
  },

  postCurrentHouseID: function(req, res) {
    var homeObj = {
      home: { address: '' }
    };

    helpers.getHomeById(req.body)
      .then(function(home) {
        homeObj.home.address = home.get('address');
        helpers.getEvents(homeObj)
          .then(function(eventsArray) {
            console.log("HERE IS EVENTS ARRAY RETURNED FROM DB", eventsArray);
            res.status(200).send(eventsArray);
          })
      })
  }

}
