var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

//create Promotion model
var promotionSchema = new Schema({
	code: {type: String, require:true, trim:true, unique:true },
	reduction: {type: Number, require: true, trim:true},
	produits : [{type: Schema.Types.ObjectId, ref:'Produits', default: null, require: false}]
});

module.exports = mongoose.model('Promotions', promotionSchema);