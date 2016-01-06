var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: String,
  email: String,
  password: String,
  address: String
});

module.exports = mongoose.model('User', userSchema);
