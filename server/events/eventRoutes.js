var eventController = require('./eventController.js');

module.exports = function(app) {
  app.get('/events', eventController.getEvents);
  app.post('/booked', eventController.postEvent);
};
