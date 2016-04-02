/**
 * test
 */
var assert = require('assert'),
    mongoose = require('mongoose'),
    FormatDate = mongoose.Schema.Types.FormatDate = require('../formatdate');

var conn = mongoose.createConnection('mongodb://localhost/formatdate-test');

describe('formatdate', function() {

  var Comment = conn.model('Comment', 
    new mongoose.Schema({
      date: FormatDate
    })
  );

  after(function() {
    conn.close();
  });

  it('YYYY-MM-DD', function(done) {
    new Comment({
      date: '2012-01-01'
    }).save(function(err, doc) {
      assert.equal(doc.date, new Date(2012, 0, 1).toString());
      done(err);
    });
  });

  it('ValidatorError', function(done) {
    new Comment({
      date: '2012/01/01'
    }).save(function(err, doc) {
      assert.ok(err && err.errors && err.errors.date);
      assert.equal(err.errors.date.name, 'ValidatorError');
      done();
    });
  });

  it('YYYY-MM-DD HH:mm:ss', function(done) {
    var Comment2 = conn.model('Comment2', 
      new mongoose.Schema({
        date: {type: FormatDate, format: 'YYYY-MM-DD HH:mm:ss'}
      })
    );
    new Comment2({
      date: '2012-01-01 01:23:45'
    }).save(function(err, doc) {
      assert.equal(doc.date, new Date(2012, 0, 1, 1, 23, 45).toString());
      done(err);
    });
  });

});
