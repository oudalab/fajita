var mongoose=require("mongoose");
module.exports=mongoose.model('verbDictionary',{
 sentenceId:{type:String},
 word:{type:String},
 verbcode:{type:String},
 confidenceFlag:{type:Boolean}, //the default is 0, which is user is conficdent about this.
 userId:{type:String},
 userName:{type:String},
 taggingTime:{type:Date,default:Date.now}
});