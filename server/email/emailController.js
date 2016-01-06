var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var generator = require('xoauth2').createXOAuth2Generator({
  user: '{username}',
  clientId: '{Client ID}',
  clientSecret: '{Client Secret}',
  refreshToken: '{refresh-token}'
});

generator.on('token', function(token){
  console.log('New token for %s: %s', token.user, token.accessToken);
});

var transport = nodemailer.createTransport("SMTP",{
  service: "Gmail",
  // port: 465,
  auth: {
  	// xoauth2: generator
    user: "roomtaptap@gmail.com",
    pass: "noderegrats"
  }
});


var maillist = ["Rachel <jenkinsr07@gmail.com>", "Lizz <zbanalagay@gmail.com>", "Malek <malekascha@gmail.com>"]

maillist.toString();


transport.sendMail({
  from: "RoomTapTap... <roomtaptap@gmail.com>", 
  to: maillist, 
  subject: "Hello",
  text: "Hello, team Node Regrats...tap tap! <3, a friendly bot, AKA nodemailer" 
}, function(error, response){
   if(error){
       console.log(error);
   }else{
       console.log("Message sent: " + response.message);
   }
});

