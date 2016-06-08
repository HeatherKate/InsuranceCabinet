var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

// THIS IS A MONGOOSE MODEL FOR CREATING AN ITEM ENTITY

var ItemSchema = new Schema ({
		text: String,
		Iid: String,
		date: String
}); 

module.exports = mongoose.model ("Item", ItemSchema);