var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventSchema = new Schema({
  username: String,
  eventDate: Date,
  eventDescription: String,
  rooms: [String],
  houseName: String,
  address: String,
  duration: Number
});

module.exports = mongoose.model('Event', eventSchema);
