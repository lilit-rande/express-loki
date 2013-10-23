var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	ObjectId = Schema.Types.ObjectId;

//create session model

var sessionSchema = new Schema({
	sId: {type: String, require: true, trim: true, unique: true},
	panier : [{
		produit_id: {type: Schema.Types.ObjectId, ref: 'Produits', require: true},
		produit_title: {type: String, require: true, trim: true, unique: false},
		arrive: {type: Date, require: true, trim: true},
		depart: {type: Date, require: true, trim: true},
		prix: {type: Number, require: true, trim: true},

		promotion_id: {type: Schema.Types.ObjectId, ref: 'Promotions', require: false},
		promotion_code: {type: String, require:true, trim:true },
		// promotion_code: {type: String, require:true, trim:true, unique:true },
		promotion_reduction: {type: Number, require: true, trim:true},

		salle_id: {type: Schema.Types.ObjectId, ref: 'Salles', require: true},
		salle_title: {type: String, require: true, trim: true},
		salle_adresse: {type: String, require: true, trim: true},
		salle_capacite: {type: Number, require: true, trim: true},
		salle_categorie: {type: String, require: true, trim: true},
		salle_cp: {type: Number, require: true, trim: true},
		salle_image: {type: String, require: false, trim: true},
		salle_pays: {type: String, require: true, trim: true},
		salle_ville: {type: String, require: true, trim: true},
	}],
	count: {type: Number, require: true, trim: true}
	
});
module.exports = mongoose.model('Session', sessionSchema);