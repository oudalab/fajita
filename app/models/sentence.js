var mongoose=require("mongoose");

module.exports=mongoose.model('sentence',{
docId:{type:String},
wholeSentence:{type:String},
actor:{type:String},
verb:{type:String},
target:{type:String},
tagged:{type:Boolean}  //tagged will be true if this sentences is tagged by the user already.
});