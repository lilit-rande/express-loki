var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	ObjectId = Schema.Types.ObjectId;

//create panier model

var panierSchema = new Schema({
	sid: {type: String, require: true, trim: true, unique: true},
	membre_id: {type: Schema.Types.ObjectId, ref: 'Membres', require: false},
	produit_id: {type: Schema.Types.ObjectId, ref: 'Produits', require: true},
	promotion_id: {type: Schema.Types.ObjectId, ref: 'Promotions', require: false},
	salle_id: {type: Schema.Types.ObjectId, ref: 'Salles', require: true}, 
	dateCreation: {type: Date, require: true, trim: true},
	count: {type: Number, require: true, trim: true}
});
module.exports = mongoose.model('Panier', panierSchema);