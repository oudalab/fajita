var mongoose = require("mongoose");
module.exports = mongoose.model('fastperentity', {
	id: {
		type: String
	},
	word: {
		type: String
	},
	sentenceids: {
		type:  Array , "default" : []
	},
	status:{
		type:String,"default":"none"
		//default is 0,means no body touch it yet
		//"exist" means it is exist from the normal interface--,
		//"skip" means it is skipped--
		//"done" means it is a person. and we have done tagging with the fast tagging interface--
	},
	person:{
		type:Boolean,"default":false
		//true means it is a person
		//false means it is not a person.
	},
	taggingtime: {
		type: Date,
	},
	timespend:{
		type:Number
	}
	/*this is a database first model, need to define the collection name this model mapped to here*/
},"fast_per_entities");



