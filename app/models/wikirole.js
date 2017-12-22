var mongoose = require("mongoose");

module.exports = mongoose.model('wikirole', {

	wiki_pages:[], //this will store an array of json objects including the name and wiki link, name in different language
    wiki_roles:[], //which each element has the property of :title, start date, end date,
    cameo_coding:[] //this will be a list of cameo coding result.
});
