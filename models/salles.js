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
	description: String
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

module.exports = mongoose.model('Salles', salleSchema);