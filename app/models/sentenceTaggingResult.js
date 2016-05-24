var mongoose=require("mongoose");
var FormatDate=mongoose.Schema.Types.FormatDate=require('../../node_modules/mongoose-schema-formatdate/formatdate')
module.exports=mongoose.model('sentenceTaggingResult',{
sentenceId:{type:String}, //this is the Id of the sentence in the sentence table
sourceCountryCode:{type:String},
sourceFirstroleCode:{type:String},
sourceSecondroleCode:{type:String},
sourceStartDate:{type:FormatDate,format:'YYYY-MM-DD'},
sourceEndDate:{type:FormatDate,format:'YYYY-MM-DD'},
verbCode:{type:String},
targetCountryCode:{type:String},
targetFirstroleCode:{type:String},
targetSecondroleCode:{type:String},
targetStartDate:{type:FormatDate,format:'YYYY-MM-DD'},
targetEndDate:{type:FormatDate,format:'YYYY-MM-DD'},
userId:{type:String},
taggingTime:{type:Date,default:Date.now}
});