var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	ObjectId = Schema.Types.ObjectId;

//create Salle model
var salleSchema = new Schema({
	title: {type: String, require: true, trim: true, index: {sparse: true} },
	adresse: {type: String, require: true, trim: true, index: {sparse: true} },
	ville: {type: String, require: true, trim: true, index: {sparse: true} },
	cp: {type: Number, require: true, trim: true, index: {sparse: true} },
	pays: {type: String, require: true, trim: true, index: {sparse: true} },
	capacite: {type: Number, require: true, trim: true, index: {sparse: true} },
	categorie: {type: String, require: true, trim: true, index: {sparse: true} },
	image: {type: String, require: false, trim: true},
	description: {type: String, require: false, trim: true},
	produits : [{type: Schema.Types.ObjectId, ref:'Produits', index: {sparse: true} }],
	commentaires : [{type: Schema.Types.ObjectId, ref:'Commentaires', default:null, index: {sparse: true} }]
});

module.exports = mongoose.model('Salles', salleSchema);