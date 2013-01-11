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
	capacite: Number,
	categorie: {type: String, require: true, trim: true},
	image: String,
	description: String,
	produits : [{type: Schema.Types.ObjectId, ref:'Produits'}],
	avis : [{type: Schema.Types.ObjectId, ref:'Avis'}]
});

module.exports = mongoose.model('Salles', salleSchema);