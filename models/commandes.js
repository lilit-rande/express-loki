var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	ObjectId = Schema.Types.ObjectId;

//create Commande model

var commandeSchema = new Schema({
	ref: {type: String, require: true, trim: true, unique: true},
	membre_id: {type: Schema.Types.ObjectId, ref: 'Membres'},
	produit_id: {type: Schema.Types.ObjectId, ref: 'Produits'},
	date: {type: Date, require: true, trim: true},
	montant: {type: Number, require: true, trim: true},
	etat: {type: Number, require: true, trim: true}	//1:payé, 0: non payé, 2:annulé 
});
/*
http://mongoosejs.com/docs/populate.html
var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  
var PersonSchema = new Schema({
  name    : String,
  age     : Number,
  stories : [{ type: Schema.Types.ObjectId, ref: 'Story' }]
});

var StorySchema = new Schema({
  _creator : { type: Schema.Types.ObjectId, ref: 'Person' },
  title    : String,
  fans     : [{ type: Schema.Types.ObjectId, ref: 'Person' }]
});

var Story  = mongoose.model('Story', StorySchema);
var Person = mongoose.model('Person', PersonSchema);
*/

module.exports = mongoose.model('Commandes', commandeSchema);