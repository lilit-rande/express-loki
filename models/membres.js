var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	ObjectId = Schema.Types.ObjectId;

//create Membre model

var membreSchema = new Schema({	
		pseudo: {type: String, require: true, trim: true, unique: true},
		mdp: {type: String, require: true, trim: true},
		nom: {type: String, require: true, trim: true},	
		prenom: {type: String, require: true, trim: true},
		email: {type: String, require: true, trim: true, unique: true},
		sexe: {type: String, require: true, trim: true},
		ville: {type: String, require: true, trim: true},
		cp: {type: String, require: true, trim: true},
		adresse: {type: String, require: true, trim: true},
		statut: {type: String, require: true, trim: true},
		commentaires : [{type: Schema.Types.ObjectId, ref:'Commentaires', default: null, require: false}],
		commandes : [{type: Schema.Types.ObjectId, ref:'Commandes', default: null, require: false}]
	});

module.exports = mongoose.model('Membres', membreSchema);