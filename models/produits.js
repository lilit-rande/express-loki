var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	ObjectId = Schema.Types.ObjectId;

//create Produit model

var produitSchema = new Schema({
	arrive: {type: Date, require: true, trim: true},
	depart: {type: Date, require: true, trim: true},
	salle_id: {type: Schema.Types.ObjectId, ref: 'Salles', default: null, require: true},	
	promotion_id: {type: Schema.Types.ObjectId, ref: 'Promotions', default: null, require: false},
	prix: {type: Number, require: true, trim: true},
	etat: {type: Number, require: true, trim: true},
});
module.exports = mongoose.model('Produits', produitSchema);