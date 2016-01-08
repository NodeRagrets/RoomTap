var houseController = require('./houseController.js');

module.exports = function(app) {
  app.post('/address', houseController.address);
  app.post('/build', houseController.build);
  app.post('/users', houseController.users);
};
