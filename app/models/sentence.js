var mongoose=require("mongoose");

module.exports=mongoose.model('sentence',{
wholeSentence:{type:String},
actor:{type:String},
verb:{type:String},
target:{type:String}
});