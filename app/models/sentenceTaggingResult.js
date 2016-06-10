var mongoose=require("mongoose");
var FormatDate=mongoose.Schema.Types.FormatDate=require('../../node_modules/mongoose-schema-formatdate/formatdate')
module.exports=mongoose.model('sentenceTaggingResult',{
sentenceId:{type:String}, //this is the Id of the sentence in the sentence table, that is created by mongo.

sourceList:[{
  sourceWord:{type:String},
  sourceCountryCode:{type:String},
  sourceFirstroleCode:{type:String},
  sourceSecondroleCode:{type:String},
  sourceStartDate:{type:FormatDate,format:'YYYY-MM-DD'},
  sourceEndDate:{type:FormatDate,format:'YYYY-MM-DD'},
}],
//just define verb as a list instead of a single in this way it is easy to make if they decide to change schema again
verbList=[{
	verbWord:{type:String},
	verbCode:{type:String},
}],

targetList=[{
	targetWord:{type:String},
	targetCountryCode:{type:String},
	targetFirstroleCode:{type:String},
	targetSecondroleCode:{type:String},
	targetStartDate:{type:FormatDate,format:'YYYY-MM-DD'},
	targetEndDate:{type:FormatDate,format:'YYYY-MM-DD'},
}],

userId:{type:String},
taggingTime:{type:Date,default:Date.now}
});