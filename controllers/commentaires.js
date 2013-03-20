//The commentaire controller
var superController = require('../controllers/controller.js'),
	Model = require('../models/commentaires.js'),
	Salle = require('../models/salles.js'),	
	fs = require('fs'),
	jade = require('jade'),
	async = require('async');

function renderTpl(tplName, tplBody){
	var jadefile = fs.readFileSync(tplName),
		jadetemplate = jade.compile(jadefile),
		content = jadetemplate(tplBody);
	return content;
}

//index listing of promos at :  /commentaires/
exports.index = function(req, res){	
	Model
		.find()
		.populate('salle_id membre_id')
		.exec(function(err, docs) {
		if(err) {
			throw err;
		} else if( (docs) && (docs.length) ) {
			res.render('commentaires/index', { title: 'Commentaire', docs: docs});
		} else {
			res.render('commentaires/index', { title: 'Commentaire', docs: null});
		}
	});
}

//delete a comment
exports.destroy = function(req, res) {
	var ref = req.params.id;
	
	Model.remove({'_id': ref}, function(err){
		if(err) {
			res.render('generals/error', {title: "Echec de suppression", body: "Il n'y a pas d'commentaire avec un identifient " + ref});
		} else {
			res.render('generals/modified', {title: "Commentaire supprimé", body: "L'commentaire a bien été supprimé."});
		}
	});
};

//methodes fictives juste pour que les routes marchent
exports.new = function(req, res) {}
exports.create = function(req, res) {};
exports.edit = function(req, res) {};
exports.update = function(req, res) {};
exports.show = function(req, res) {
/*
	var	ref = req.params.id;

	Model.findOne({'_id': ref})
		.populate('salle_id')
		.populate('membre_id')
		.exec(function(err, doc){	
		if(err) {
			throw err;
		} else {
			if (!doc) {
				res.render('commentaires/show', {id: ref, title:'Détailles de l\'commentaire', data:doc});
			} else {
				res.render('commentaires/show', {title: 'Détailles de l\'commentaire', data: doc});
			}
		}
	});
	*/
}



