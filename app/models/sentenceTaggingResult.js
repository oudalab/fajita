var mongoose=require("mongoose");

module.exports=mongoose.model('sentenceTaggingResult',{
sentenceId:{type:String}, //this is the Id of the sentence in the sentence table
sourceCode:{type:String},
verbCode:{type:String},
targetCode:{type:String},
userId:{type:String},
taggingTime:{type:Date,default:Date.now}
});