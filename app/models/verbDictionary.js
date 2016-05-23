var mongoose=require("mongoose");
module.exports=mongoose.model('verbDictionary',{
 word:{type:String},
 verbcode:{type:String},
 confidenceFlag:{type:Boolean},
 userId:{type:String},
 userName:{type:String},
 taggingTime:{type:Date,default:Date.now}
});