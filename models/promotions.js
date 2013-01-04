var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

//create Promotion model
var promoSchema = new Schema({
	code: {type: String, require:true, trim:true, unique:true },
	reduction: {type: Number, require: true, trim:true}
});

module.exports = mongoose.model('Promotions', promoSchema);
