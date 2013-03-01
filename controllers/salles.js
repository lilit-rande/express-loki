//The salles controller
var superController = require('../controllers/controller.js'),
	Model = require('../models/salles.js'),
	Produits = require('../models/produits.js'),
	Avis = require('../models/avis.js'),	
	fs = require('fs'),
	jade = require('jade'),
	async = require('async'),
	model = 'Salle';

function renderTpl(tplName, tplBody){
	var jadefile = fs.readFileSync(tplName),
		jadetemplate = jade.compile(jadefile),
		content = jadetemplate(tplBody);
	return content;
}
		
//index listing of salles at :  /salles/
exports.index = function(req, res){
	Model
	.find()
	.populate('produits')
	.populate('avis')
	.exec(function(err, docs) {
		if(err) {
			throw err;
		} else if( (docs) && (docs.length) ) {
			res.render('salles/index', { title: 'Salles', docs: docs});
		} else {
			res.render('salles/index', { title: 'Salles', docs: null});
		}
	});
}

//display new salle form
exports.new = function(req, res) {	
	var options = {'title':'Ajouter une salle','action':'create','image':'', 'type': 'Ajouter'},
		html =  renderTpl('views/forms/salles/new.jade', options);
	
	res.render('salles/new', {title: 'Ajouter une salle', body: html});
}

//add a salle
exports.create = function(req, res) {
	var salle = {
		title: req.body.salletitle,
		adresse: req.body.salleadresse,
		ville: req.body.salleville,
		cp: req.body.sallecp,
		pays: req.body.sallepays,
		capacite: req.body.sallecapacite,
		categorie: req.body.sallecategorie,
		image: req.body.salleimagevisible,
		description: req.body.salledescription
	};
	modelObj = new Model(salle);
	
	modelObj.save(function(err, data){
		if(err) {
			//	console.log(err);
			res.render('generals/error', {title: "Echec de création", body: "Il n'est pas possible de créér la salle ! Message : " + err.message});
		} else {
			res.render('generals/modified', {title: 'Salle ajoutée', body: "La salle a bien été ajoutée."});
		}
	});
};

//display delete form
exports.delete = function(req, res) {
	var	reference = req.params.id;
		
	Model.findOne({'_id': reference}, function(err, doc){
		if (err) {
			res.render('generals/error', {title: "Echec", body: err});
		} else {
			res.render('generals/deletePopup', {title: "Suppression d'une salle", type: 'salles', id: reference, type_datas: doc});
		}
	});
};

//delete a salle
exports.destroy = function(req, res) {
	var ref = req.params.id;
	
	Model.remove({'_id': ref}, function(err){
		if(err) {
			res.send(err);
		} else {
			res.send("success");
		}
	});
};

//display edit form
exports.edit = function(req, res) {
	var ref = req.params.id,
		imagePath = '../../images/vignettes/';
	
	Model.findOne({'_id': ref}, function(err, doc){
		if (err) {
			res.render('generals/error', {title: "Echec de modification", body: "Il n'y a pas de salle avec l'identifient " + ref + " !"});
		} else {
			res.data = doc;
			
			var	options = {'title':'Modifier la salle', 'action': 'salles/'+ref, 'image': imagePath + doc.image, 'type': 'Modifier'},
				html = renderTpl('views/forms/salles/edit.jade', options);
				res.html = html;
				res.send({data: doc, html: html});	
		}	//fin else
	});
};

//update a salle
exports.update = function(req, res) {
	var salle = {
			title: req.body.salletitle,
			adresse: req.body.salleadresse,
			ville: req.body.salleville,
			cp: req.body.sallecp,
			pays: req.body.sallepays,
			capacite: req.body.sallecapacite,
			categorie: req.body.sallecategorie,
			image: req.body.salleimage,
			description: req.body.salledescription
		},		
		ref = req.params.id;
	console.log(salle);
	Model.update({'_id': ref}, salle, function(err, docs) {
		if (err) {
			res.render('generals/error',{title: "Problème avec la mise à jour: ", body: 'Message : ' + err});
		} else {
			res.render('generals/modified', {title: "Salle modifiée", body: "La salle a bien été modifiée."});
		}
	});
};

//show a salle
exports.show = function(req, res) {
	var ref = req.params.id;

	Model.findOne({'_id': ref})
		.populate('produits')
		.populate('avis')
		.exec(function(err, doc){	
		if(err) {
			throw err;
		} else {
			if (!doc) {
				res.render('salles/show', {id: ref, title:'Détailles de la salle', data:doc});
			} else {
				res.render('salles/show', {title: 'Détailles de la salle', data: doc});
			}
		}
	});
}
