var mongoose=require("mongoose");

module.exports=mongoose.model('sentence',
{
	
docId:{type:String},
wholeSentence:{type:String},
actor:[String],
verb:[String],
tagged:{type:Boolean}  //tagged will be true if this sentences is tagged by the user already.

});