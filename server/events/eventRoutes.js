var eventController = require('./eventController.js');

module.exports = function(app) {
  app.get('/events', eventController.loadEvents);
  app.post('/booked', eventController.postEvent);
};
