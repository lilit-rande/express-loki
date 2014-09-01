var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	ObjectId = Schema.Types.ObjectId;

//create Facture model

var factureSchema = new Schema({
	ref: {type: String, require: true, trim: true, unique: true},
/*
	membre_id: {type: String, require: true},
	produit_id: {type: String, require: true},
*/

	date: {type: Date, require: true, trim: true},
	montant: {type: Number, require: true, trim: true},
	reduction: {type: Number, require: false, trim:true, default: null},
	etat: {type: Number, require: true, trim: true}	//1:payé, 0: non payé, 2:annulé 
	produit_title: {type: String, require: true, trim: true, unique: false},
	salle_title: {type: String, require: true, trim: true},
	commande_ref: {type: String, require: true, trim: true, unique: true},
	membre_details: {type: String, require; true, trim: true},
	montant_totel: {type: Number, require: true, trim: true}
	/*
	membre_pseudo: {type: String, require: true, trim: true, unique: true},
	membre_nom: {type: String, require: true, trim: true},	
	membre_prenom: {type: String, require: true, trim: true},
	membre_email: {type: String, require: true, trim: true, unique: true},
	membre_ville: {type: String, require: true, trim: true},
	membre_cp: {type: String, require: true, trim: true},
	membre_adresse: {type: String, require: true, trim: true},
	membre_statut: {type: Number, require: true, trim: true},	// 0=user, 1=moderateur, 2=admin
	*/
});
module.exports = mongoose.model('Factures', commandeSchema);
