var mongoose = require("mongoose");

module.exports = mongoose.model('documentswithtopic', {
	id: {
		type: String
	},
	document: {
		type: String
	},
	topic: {
		type: Number
	}
	/*this is a database first model, need to define the collection name this model mapped to here*/
},"documentswithtopic");
