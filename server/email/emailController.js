var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

//Ideally we'd use these generators for authentication, but for now I've just loosened up the security constraints on the roomtaptap gmail account. 
// var generator = require('xoauth2').createXOAuth2Generator({
//   user: '{username}',
//   clientId: '{Client ID}',
//   clientSecret: '{Client Secret}',
//   refreshToken: '{refresh-token}'
// });

// generator.on('token', function(token){
//   console.log('New token for %s: %s', token.user, token.accessToken);
// });
//=================
// modules.exports = {
// 	transport: nodemailer.createTransport("SMTP",{
//   service: "Gmail",
//   // port: 465,
//   auth: {
//   	// xoauth2: generator
//     user: "roomtaptap@gmail.com",
//     pass: "noderegrats"
//   }
// });
//=================

// var transport = nodemailer.createTransport("SMTP",{
//   service: "Gmail",
//   // port: 465,
//   auth: {
//   	// xoauth2: generator
//     user: "roomtaptap@gmail.com",
//     pass: "noderegrats"
//   }
// });

// var housemateMailList = ["Rachel <jenkinsr07@gmail.com>", "Lizz <zbanalagay@gmail.com>", "Malek <malekascha@gmail.com>"];
// housemate.toString();

module.exports = {

	transport: nodemailer.createTransport("SMTP",{
	  service: "Gmail",
	  auth: {
	  	// xoauth2: generator
	    user: "roomtaptap@gmail.com",
	    pass: "noderegrats"
	  }
	}),

	sendEmail: function(emailDataObj) {
		this.transport.sendMail({
		  from: "RoomTapTap... <roomtaptap@gmail.com>", 
		  to: emailDataObj.housemateEmails, 
		  // subject: "Hello from RoomTap! A room has been reserv"
		  subject: "RoomTap Notification: " + emailDataObj.userWhoBookedARoom + " booked a room in " + emailDataObj.houseName + ".",
		  text: "Heads up from RoomTap! \n" + emailDataObj.userWhoBookedARoom + " booked the room " + emailDataObj.roomName + " on " + emailDataObj.eventDate + ". \nHave a great day! \n -The RoomTap Team"
		}, function(error, response){
		    if(error){
		      console.log(error);
		    } else {
		      console.log("Message sent: " + response.message);
		    }
		})
	}


};








// var sendEmail = function() {
// 	transport.sendMail({
// 	  from: "RoomTapTap... <roomtaptap@gmail.com>", 
// 	  to: maillist, 
// 	  subject: "Hello",
// 	  text: "Hello, team Node Regrats...tap tap! <3, a friendly bot, AKA nodemailer" 
// 	}, function(error, response){
// 	   if(error){
// 	       console.log(error);
// 	   }else{
// 	       console.log("Message sent: " + response.message);
// 	   }
// }

// });

