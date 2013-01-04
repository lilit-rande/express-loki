var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

//create Produit model

var produitSchema = new Schema({
	sallereference: {type: Schema.ObjectId, ref: 'Salles'},
	produitreference: {type: Number, require: true, trim: true, unique: true},
	arrive: {type: Date, require: true, trim: true},
	depart: {type: Date, require: true, trim: true},	
	promotionreference: {type: Number, ref: 'Promotions'},
	prix: {type: Number, require: true, trim: true},
	etat: {type: Number, require: true, trim: true},

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

module.exports = mongoose.model('Produits', produitSchema);