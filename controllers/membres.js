//The salles controller
var superController = require('../controllers/controller.js'),
	Model = require('../models/membres.js'),
	Avis = require('../models/avis.js'),
	Commandes = require('../models/commandes.js'),	
	fs = require('fs'),
	jade = require('jade'),
	async = require('async');

function renderTpl(tplName, tplBody){
	var jadefile = fs.readFileSync(tplName),
		jadetemplate = jade.compile(jadefile),
		content = jadetemplate(tplBody);
	return content;
}
		
//index listing of members at :  /membres/
exports.index = function(req, res){
	Model
		.find()
		.populate('avis')
		.populate('commandes')
		.exec(function(err, docs) {
		if(err) {
			throw err;
		} else if( (docs) && (docs.length) ) {
			res.render('membres/index', { title: 'Membres', docs: docs});
		} else {
			res.render('membres/index', { title: 'Membres', docs: null});
		}
	});
}

//display new member form
exports.new = function(req, res) {
	var options = {'title':'Inscription','action':'create', 'type': 'Ajouter'},
		html =  renderTpl('views/forms/membres/new.jade', options);

	res.render('membres/new', {title: 'Inscription', body: html});
}

//add a member
exports.create = function(req, res) {
	membre = { 
			pseudo : req.body.pseudo,
			mdp : req.body.mdp,
			email : req.body.email,
			nom : req.body.nom,
			prenom : req.body.prenom,
			sexe : req.body.sexe,	// 'f' ou 'm'
			ville : req.body.ville,
			cp : req.body.cp,
			adresse : req.body.adresse,
			statut : req.body.statut
	};
	modelObj = new Model(membre);

	modelObj.save(function(err, data){
		if(err) {
			//	console.log(err);
			res.render('generals/error', {title: "Echec de création", body: "Il n'est pas possible de créer ce membre ! Message : " + err.message});
		} else {
			res.render('generals/modified', {title: 'Membre ajouté', body: "Le membre a bien été ajouté."});
		}
	});
};

//display delete form
exports.delete = function(req, res) {
	var	reference = req.params.id;
		
	Model.findOne({'_id': reference}, function(err, doc){
		if (err) {
			res.render('error', {title: "Echec", body: err});
		} else {
			res.render('generals/deletePopup', {title: "Suppression d'un membre", type: 'membre', id: reference, type_datas: doc});
		}
	});
};

//delete a member
exports.destroy = function(req, res) {
	var ref = req.params.id;
	
	Model.remove({'_id': ref}, function(err){
		if(err) {
			res.render('generals/error', {title: "Echec de suppression", body: "Il n'y a pas de membre avec un identifient " + ref});
		} else {
			res.render('generals/modified', {title: "Membre supprimé", body: "Le membre a bien été supprimé."});
		}
	});
};

//display edit form
exports.edit = function(req, res) {
	var  ref = req.params.id,
		imagePath = '../../images/vignettes/';
	
	Model.findOne({'_id': ref}, function(err, doc){
		if (err) {
			res.render('error', {title: "Echec de modification", body: "Il n'y a pas de membre avec l'identifient " + ref + " !"});
		} else {
			res.data = doc;
			
			var	options = {'title':'Modifier les donnés du membre', 'action': 'membres/' + ref, 'image': imagePath + doc.image, 'type': 'Modifier'},
				html = renderTpl('views/forms/form-membre.jade', options);
				res.html = html;
				res.send({data: doc, html: html});	
		}	//fin else
	});

};

//update a member
exports.update = function(req, res) {
	var membre = {	
			pseudo: req.body.membrepseudo,
			mdp: req.body.membremdp,
			nom: req.body.membrenom,	
			prenom: req.body.membreprenom,
			email: req.body.membreemail,
			sexe: req.body.membresexe,
			ville: req.body.membreville,
			cp: req.body.membrecp,
			adresse: req.body.membreadresse,
			statut: req.body.membrestatut
		},
	ref = req.params.id;
	
	Model.update({'_id': ref}, membre, function(err, docs) {
		if (err) {
			res.render('generals/error',{title: "Problème avec la mise à jour: ", body: 'Message : ' + err});
		} else {
			res.render('generals/modified', {title: "Membre modifié", body: "Le membre a bien été modifiée."});
		}
	});
};

exports.pseudo = function(req, res) {
//	console.log('here');
/*
	res.contentType('json');
	res.send({ some: JSON.stringify({response:'json'}) });
	
	
	Model.count({'pseudo' : 'pseudo'}, function(err, count){
		if (err) {
			res.send(err);
		} else { 
			console.log(count);
			res.send(count);
		}
	});
	*/
};

//show member info
exports.show = function(req, res) {			
	var ref = req.params.id
		;

	Model.findOne({'_id': ref})
		.populate('avis')
		.populate('commandes')
		.exec(function(err, doc){	
		if(err) {
			throw err;
		} else {
			if (!doc) {
				res.render('membres/show', {id: ref, title:'Détailles du membre', data:doc});
			} else {
				res.render('membres/show', {title: 'Détailles du membre', data: doc});
			}
		}
	});

}





















































