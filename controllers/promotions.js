//The promotions controller
var superController = require('../controllers/controller.js'),
	Model = require('../models/promotions.js'),
	Produits = require('../models/produits.js'),	
	fs = require('fs'),
	jade = require('jade'),
	async = require('async');

function renderTpl(tplName, tplBody){
	var jadefile = fs.readFileSync(tplName),
		jadetemplate = jade.compile(jadefile),
		content = jadetemplate(tplBody);
	return content;
}

//index listing of promos at :  /promotions/
exports.index = function(req, res){	
	Model
		.find()
		.populate('produits')
		.exec(function(err, docs) {
		if(err) {
			throw err;
		} else if( (docs) && (docs.length) ) {
			res.render('promotions/index', { title: 'Promotions', docs: docs});
		} else {
			res.render('promotions/index', { title: 'Promotions', docs: null});
		}
	});
}

//display new promo form
exports.new = function(req, res) {	
	var options = {'title':'Ajouter un code de promotion','action':'create'},
		html =  renderTpl('views/forms/promotions/new.jade', options);
	
	res.render('promotions/new', {title: 'Ajouter un code de promotion', body: html});
}

//add a promotion
exports.create = function(req, res) {
	var promotion = {
		code: req.body.promotioncode,
		reduction: req.body.promotionreduction
	};
	
	modelObj = new Model(promotion);
	
	modelObj.save(function(err, data){
		if(err) {
			res.render('generals/error', {title: "Echec de création", body: "Il n'est pas possible de créér cette promotion ! Message : " + err.message});
		} else {
			res.render('generals/modified', {title: 'Code de promotion ajouté', body: "Le code de promotion a bien été ajouté."});
		}
	});
};
/*
//display delete form
exports.delete = function(req, res) {
	var	reference = req.params.id;
		
	Model.findOne({'_id': reference}, function(err, doc){
		if (err) {
			res.render('error', {title: "Echec", body: err});
		} else {
			res.render('generals/deletePopup', {title: "Suppression d'une promotion", type: 'promotion', id: reference, type_datas: doc});
		}
	});
};
*/

//delete a promotion
exports.destroy = function(req, res) {
	var ref = req.params.id;
	
	Model.remove({'_id': ref}, function(err){
		if(err) {
			res.render('generals/error', {title: "Echec de suppression", body: "Il n'y a pas de promotion avec un identifient " + ref});
		} else {
			res.render('generals/modified', {title: "Promotion supprimée", body: "La promotion a bien été supprimée."});
		}
	});
};

//display edit form
exports.edit = function(req, res) {
	var ref = req.params.id,
		imagePath = '';
	
	Model.findOne({'_id': ref}, function(err, doc){
		if (err) {
			res.render('error', {title: "Echec de modification", body: "Il n'y a pas de code promo avec l'identifient " + ref + " !"});
		} else {
			res.data = doc;
			
			var	options = {'title':'Modifier le code promotion', 'action': 'promotions/edit/'+ref, 'image': imagePath + doc.image},
				html = renderTpl('views/forms/promotions/edit.jade', options);
				res.html = html;
				res.send({data: doc, html: html});	
		}	//fin else
	});
};

//update a promotion
exports.update = function(req, res) {
	var promotion = {
			code: req.body.promotioncode,
			reduction: req.body.promotionreduction
		},
		ref = req.params.id;
	Model.update({'_id': ref}, promotion, function(err, docs) {
		if (err) {
			res.render('generals/error',{title: "Problème avec la mise à jour: ", body: 'Message : ' + err});
		} else {
//			res.render('generals/modified', {title: model + " modifié" + suffix, body: firstToUpper(articleDef) + modelLower + " a bien été modifié" + suffix + "."});
			res.redirect('promotions/');
		}
	});
};

//show a promotion
exports.show = function(req, res) {
	var ref = req.params.id;

	Model.findOne({'_id': ref})
		.populate('produits')
		.exec(function(err, doc){	
		if(err) {
			throw err;
		} else {
			if (!doc) {
				res.render('promotions/show', {id: ref, title:'Détailles de la promotion', data:doc});
			} else {
				res.render('promotions/show', {title: 'Détailles de la promotion', data: doc});
			}
		}
	});
}