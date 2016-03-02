var mongoose=require("mongoose");

module.exports=mongoose.model('verb',{
   id:{type:String},
 name:{type:String}
});