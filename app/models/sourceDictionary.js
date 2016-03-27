var mongoose=require("mongoose");

module.exports=mongoose.model('sourceDictionary',{
 word:{type:String},
 countrycode:{type:String},
 1strolecode:{type:String},
 2ndrolecode:{type:String},
 datestart:{type:Date},
 deteend:{type:Date},
 confidenceflag:{type:Boolean},
 userid:{type:String},
 taggingtime:{type:Date,default:Date.now}
}