var jwt = require('jwt-simple');
var Promise = require('bluebird');
var bcrypt = require('bcrypt-nodejs');

module.exports = {
  signup: function(req, res) {
    var newUser = req.body.userData;
    var storeUser = userModel.create.bind(userModel);
    //Since all mongoose functions are promises,
    //we need to set the this context of promise function.
    //creating promise to create new user

    var check = userModel.findOne.bind(userModel);
    //creating promise to check if user exists
    //only looking for this schema in the database

    check({ 'username' : req.body.userData.username })
      .then(function(user) {
        if(user){ 
          throw new Error('User Exists');
        } else {
          bcrypt.hash(newUser.password, null, null, function(error, hash) {
            newUser.password = hash;
            return storeUser(newUser);
          })
        }
      })
      .then(function(createdUser) {
        var token = jwt.encode(createdUser, 'WILDCARD');
        res.status(200).send(token);
      });
  },

  login: function(req, res) {
    var user = req.body.loginData;
    var check = userModel.findOne.bind(userModel);

    check({ 'username': req.body.loginData.username})
      .then(function(result) {
        if(result){
          bcrypt.compare(user.password, result.password, function(error, isMatch) {
            if(isMatch) {
              return res.json({ result: true });
            }
            res.status(401).send({result:false});
          })
          //Users exists and password matches
            //pass them through. 
        } else {
          return res.json({ result: false });
          //Users info doesn't match
            //keep them on page.
      }
    });
  }
};
