var mongoose=require("mongoose");

module.exports=mongoose.model('secondrole',{
   id:{type:String},
 name:{type:String}
});