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
	}
	/*this is a database first model, need to define the collection name this model mapped to here*/
},"fast_per_entities");
