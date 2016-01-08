var jwt = require('jwt-simple');
var Promise = require('bluebird');
var bcrypt = require('bcrypt-nodejs');
var helpers = require('./../db/helpers.js');
var utils = require('./../utility/utility.js');

module.exports = {

  facebookAuth: function(req, res){

    var username = req.body.name + '&%&' + req.body.id;
    console.log(req.body, username);
    helpers.getUser({'username': username})
    .then(function(oldUserRes){
      if(!oldUserRes){
        var newUser = {};
        newUser.username = username;
        newUser.email = req.body.email || null;
        helpers.addUser(newUser)
        .then(function(newUserRes){
          return res.status(200).json({user: newUserRes, token: utils.issueToken({username: newUserRes.get('username')})});
        });
      } else {
        return res.status(200).json({ user: oldUserRes, token: utils.issueToken({username: oldUserRes.get('username')})});
      }
    })

  },

  signup: function(req, res) {
    var newUser = req.body.userData;
    console.log("HERE IS REQ.BODY.USERDATA", req.body.userData);

    bcrypt.genSalt(10, function(error, salt) {
      if(error) {
        return res.status(401).send(error)
      }
      bcrypt.hash(newUser.password, null, null, function(error, hash) {
        if(error) {
          throw error;
        }
        newUser.password = hash;
        helpers.addUser(newUser)
          .then(function(newUser) {
            return res.status(200).json({user: newUser, token: utils.issueToken({username: newUser.get('username')})});
        })
        .catch(function(error) {
          return res.status(401).send(error);
        })
      });
    });
  },
 

  login: function(req, res) {
    var user = req.body.loginData;
    var password = req.body.loginData.password;

    if(!user.username || !password) {
      return res.status(401).send('Please enter your username and your password.');
    }

    helpers.getUser(user)
      .then(function(resUser) {
        console.log("USER INFORMATION", resUser.get('username'));
          bcrypt.compare(password, resUser.password, function(error, isMatch) {
            if(isMatch) {
              return res.status(200).json({ user: resUser, token: utils.issueToken({username: resUser.get('username')})});
            }
            if(error) {
              return res.status(401).send(error);
            }
          }); 
        })
      .catch(function(error) {
        return res.status(401).send(error);
      })
  }
};






