var eventController = require('./eventController.js');

module.exports = function(app) {
  // app.get('/events', eventController.loadEvents);
  app.post('/events', eventController.postCurrentHouseID);
  app.post('/booked', eventController.postEvent);
};
