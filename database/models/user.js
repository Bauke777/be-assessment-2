const mongoose = require('mongoose');
const bcrypt = require('bcrypt')          // hashing with bcrypt

const UserSchema = new mongoose.Schema({
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
  looking_for: {
    gender: String
  }
});

//hashing a password before saving it to the database
UserSchema.pre('save', function (next) {
  const user = this;
  bcrypt.hash(user.password, 10, function (err, hash){
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});

module.exports = mongoose.model('User', UserSchema)
