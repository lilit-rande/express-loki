var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	ObjectId = Schema.Types.ObjectId;

//create Commentaires model
var commentaireSchema = new Schema({
		date: {type: Date, require: true, trim: true},
		salle_id: {type: Schema.Types.ObjectId, ref: 'Salles'},	
		membre_id: {type: Schema.Types.ObjectId, ref: 'Membres'},
		note: {type: Number, require: true, trim: true},
		comment: {type: String, require: true, trim: true}
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

module.exports = mongoose.model('Commentaires', commentaireSchema);