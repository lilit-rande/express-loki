var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	ObjectId = Schema.Types.ObjectId;

//create Produit model

var produitSchema = new Schema({
	title: {type: String, require: true, trim: true, unique: false, index: {sparse: true} },
	arrive: {type: Date, require: true, trim: true, index: {sparse: true} },
	depart: {type: Date, require: true, trim: true, index: {sparse: true} },
	salle_id: {type: Schema.Types.ObjectId, ref: 'Salles', default: null, require: true},	
	promotion_id: {type: Schema.Types.ObjectId, ref: 'Promotions', default: null, require: false},
	prix: {type: Number, require: true, trim: true, index: {sparse: true} },
	etat: {type: Number, require: true, trim: true},	//1:Loué, 0: A louer
	commandes:[{type: Schema.Types.ObjectId, ref: 'Commandes', default: null, require: false, index: {sparse: true} }]
});
module.exports = mongoose.model('Produits', produitSchema);