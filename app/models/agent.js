var mongoose = require("mongoose");

module.exports = mongoose.model('agent', {
	id: {
		type: String
	},
	name: {
		type: String
	}
});