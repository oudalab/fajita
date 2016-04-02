var mongoose = require('mongoose'),
    FormatDate = mongoose.Schema.Types.FormatDate = require('../formatdate');

/**
 * example
 */
var db = mongoose.createConnection('mongodb://localhost/sample');

var UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  date: {type: FormatDate, format: 'YYYY-MM-DD', default: Date.now}
});
var User = db.model('User', UserSchema);

var user = new User({
  username: 'foo',
  password: 'bar',
  date: "2012-07-07"
});

user.save(function(err, doc) {
  console.log(err, doc);
  User.find({}, function(err, docs) {
    console.log(err, docs); 
    mongoose.disconnect();
    process.exit();
  });
});
