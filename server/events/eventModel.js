var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventSchema = new Schema({
  username: String,
  eventDate: Date,
  eventDescription: String,
  eventAlert: Boolean,
  roomName: String,
  houseName: String
});

module.exports = mongoose.model('Event', eventSchema);
