var userController = require('./userController.js');

module.exports = function(app) {
  app.post('/facebookAuth',  userController.facebookAuth);
  app.post('/signup', userController.signup, userController.FBsignup);
  app.post('/login', userController.login);
  // app.get('/facebookAuth',  function(){console.log('geh')});

};
