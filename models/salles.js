var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	ObjectId = Schema.Types.ObjectId;

//create Salle model
var salleSchema = new Schema({
	title: {type: String, require: true, trim: true},
	adresse: {type: String, require: true, trim: true},
	ville: {type: String, require: true, trim: true},
	cp: {type: Number, require: true, trim: true},
	pays: {type: String, require: true, trim: true},
	capacite: {type: Number, require: true, trim: true},
	categorie: {type: String, require: true, trim: true},
	image: {type: String, require: false, trim: true},
	description: {type: String, require: false, trim: true},
	produits : [{type: Schema.Types.ObjectId, ref:'Produits'}],
	commentaires : [{type: Schema.Types.ObjectId, ref:'Commentaires', default:null}]
});

module.exports = mongoose.model('Salles', salleSchema);