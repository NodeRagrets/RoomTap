var houseController = require('./houseController.js');

module.exports = function(app) {
  app.post('/build', houseController.build);
};
