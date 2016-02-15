var mongoose=require("mongoose");

module.exports=mongoose.model('actor',{
   id:{type:String},
 name:{type:String}
});