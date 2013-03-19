var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	ObjectId = Schema.Types.ObjectId;

//create Commande model

var commandeSchema = new Schema({
	ref: {type: String, require: true, trim: true, unique: true},
	membre_id: {type: Schema.Types.ObjectId, ref: 'Membres', require: true},
	produit_id: {type: Schema.Types.ObjectId, ref: 'Produits', require: true},
	date: {type: Date, require: true, trim: true},
	montant: {type: Number, require: true, trim: true},
	etat: {type: Number, require: true, trim: true}	//1:payé, 0: non payé, 2:annulé 
});
module.exports = mongoose.model('Commandes', commandeSchema);