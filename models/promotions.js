var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

//create Promotion model
<<<<<<< Updated upstream
var promotionSchema = new Schema({
	code: {type: String, require:true, trim:true, unique:true },
	reduction: {type: Number, require: true, trim:true},
	produits : [{type: Schema.Types.ObjectId, ref:'Produits', default: null, require: false}]
=======

// var promotionSchema = new Schema({
// 	code: {type: String, require:true, trim:true, index: {sparse: true, unique:true}  },
// 	reduction: {type: Number, require: true, trim:true},
// 	produits : [{type: Schema.Types.ObjectId, ref:'Produits', default: null, require: false}]
// });

var Any = new Schema({
	any: Schema.Types.Mixed
>>>>>>> Stashed changes
});

module.exports = mongoose.model('Promotions', Any);
// module.exports = mongoose.model('Promotions', promotionSchema);
