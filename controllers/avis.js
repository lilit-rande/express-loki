//The avis controller
var superController = require('../controllers/controller.js'),
	Model = require('../models/avis.js'),
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

//index listing of promos at :  /avis/
exports.index = function(req, res){	
	Model
		.find()
		.populate('salle_id')
		.populate('membre_id')
		.exec(function(err, docs) {
		if(err) {
			throw err;
		} else if( (docs) && (docs.length) ) {
			res.render('avis/index', { title: 'Avis', docs: docs});
		} else {
			res.render('avis/index', { title: 'Avis', docs: null});
		}
	});
}

//display new promo form
exports.new = function(req, res) {	
	/*
	var options = {'title':'Ajouter une salle','action':'create','image':'', 'type': 'Ajouter'},
		html =  renderTpl('views/forms/form-avis.jade', options);
	
	res.render('salles/new', {title: 'Ajouter Ajouter une salle', body: html});
	*/
}

//add a promotion
exports.create = function(req, res) {
/*
	var avis = {
			date: req.body.avisdate,
			salle_id: req.body.new_salle_id,
			membre_id: req.body.membre_id,
			note: req.body.avisnote,
			comment: req.body.aviscomment
		};
	
	modelObj = new Model(avis);
	
	modelObj.save(function(err, data){
		if(err) {
			//	console.log(err);
			res.render('generals/error', {title: "Echec de création", body: "Il n'est pas possible de créér cet avis ! Message : " + err.message});
		} else {
			res.render('generals/modified', {title: 'Avis ajouté', body: "L'avis a bien été ajouté."});
		}
	});
	*/
};

//display delete form
exports.delete = function(req, res) {
	var	reference = req.params.id;
		
	Model.findOne({'_id': reference}, function(err, doc){
		if (err) {
			res.render('generals/error', {title: "Echec", body: err});
		} else {
			res.render('generals/deletePopup', {title: "Suppression d'un avis", type: 'avis', id: reference, type_datas: doc});
		}
	});
};

//delete a promotion
exports.destroy = function(req, res) {
	var ref = req.params.id;
	
	Model.remove({'_id': ref}, function(err){
		if(err) {
			res.render('generals/error', {title: "Echec de suppression", body: "Il n'y a pas d'avis avec un identifient " + ref});
		} else {
			res.render('generals/modified', {title: "Avis supprimé", body: "L'avis a bien été supprimé."});
		}
	});
};


//display edit form
exports.edit = function(req, res) {
};

//update a promotion
exports.update = function(req, res) {
};

//show a promotion
exports.show = function(req, res) {
	var	ref = req.params.id;

	Model.findOne({'_id': ref})
		.populate('salle_id')
		.populate('membre_id')
		.exec(function(err, doc){	
		if(err) {
			throw err;
		} else {
			if (!doc) {
				res.render('avis/show', {id: ref, title:'Détailles de l\'avis', data:doc});
			} else {
				res.render('avis/show', {title: 'Détailles de l\'avis', data: doc});
			}
		}
	});
}

