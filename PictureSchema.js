var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var PictureSchema = new Schema ({
	  img: { data: Buffer, contentType: String },
		text: String,
		Iid: String,
		date: String
})

module.exports = mongoose.model ("Picture", PictureSchema);