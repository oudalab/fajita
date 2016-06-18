var mongoose=require("mongoose");
var mongoosePaginate = require('mongoose-paginate');

var schema = new mongoose.Schema({
 sentenceId:{type:String},
 word:{type:String},
 verbcode:{type:String},
 confidenceFlag:{type:Boolean}, //the default is 0, which is user is conficdent about this.
  userId:{type:String},
 userName:{type:String},
 taggingTime:{type:Date,default:Date.now}
});
schema.plugin(mongoosePaginate);

module.exports = mongoose.model('verbDictionary',  schema); 