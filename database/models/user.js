var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    max: 40,
    trim: true
  },
  first_name: {
    type: String,
    required: true,
    trim: true,
    max: 20
  },
  last_name: {
    type: String,
    required: true,
    trim: true,
    max: 20
  },
  password: {
    type: String,
    required: true
  },
  profile_picture: {
    type: String
  },
  gender: {
    type: String
  },
  birthday: {
    type: String
  },
  description: {
    type: String
  },
});
module.exports = mongoose.model('User', UserSchema)
