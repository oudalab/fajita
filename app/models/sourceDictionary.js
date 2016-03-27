var mongoose=require("mongoose");

module.exports=mongoose.model('sourceDictionary',{
 word:{type:String},
 countryCode:{type:String},
 firstRoleCode:{type:String},
 secondRoleCode:{type:String},
 dateStart:{type:Date},
 deteEnd:{type:Date},
 confidenceFlag:{type:Boolean},
 userId:{type:String},
 taggingTime:{type:Date,default:Date.now}
});