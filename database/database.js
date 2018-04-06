// Mongoose settings for connection with MongoDB
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/date_database');

var mdb = mongoose.connection;
mdb.on('error', console.error.bind(console, 'connection error:'));
mdb.once('open', function() {
  console.log('connected to mongodb')
});
