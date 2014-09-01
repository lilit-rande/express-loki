var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	ObjectId = Schema.Types.ObjectId;

//create Membre model

var membreSchema = new Schema({	
		pseudo: {type: String, require: true, trim: true, index: {sparse: true, unique: true}},
		mdp: {type: String, require: true, trim: true, index: {sparse: true} },
		nom: {type: String, require: true, trim: true, index: {sparse: true} },
		prenom: {type: String, require: true, trim: true, index: {sparse: true} },
		email: {type: String, require: true, trim: true, index: {sparse: true, unique: true} },
		sexe: {type: String, require: true, trim: true},
		ville: {type: String, require: true, trim: true, index: {sparse: true} },
		cp: {type: String, require: true, trim: true, index: {sparse: true} },
		adresse: {type: String, require: true, trim: true, index: {sparse: true} },
		statut: {type: Number, require: true, trim: true},	// 0=user, 1=moderateur, 2=admin
		commentaires : [{type: Schema.Types.ObjectId, ref:'Commentaires', default: null, require: false, index: {sparse: true} }],
		commandes : [{type: Schema.Types.ObjectId, ref:'Commandes', default: null, require: false, index: {sparse: true} }]
	});

// membreSchema.index({ pseudo : 1, mdp : 1}, {unique: true});

module.exports = mongoose.model('Membres', membreSchema);