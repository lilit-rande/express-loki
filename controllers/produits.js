//The promotions controller
var superController = require('../controllers/controller.js'),
	Model = require('../models/produits.js'),	
	Salle = require('../models/salles.js'),
	Promotion = require('../models/promotions.js'),
	Commande = require('../models/commandes.js'),	
	fs = require('fs'),
	jade = require('jade');
//	async = require('async'),
	Deferred = require ('JQDeferred');

function renderTpl(tplName, tplBody){
	var jadefile = fs.readFileSync(tplName),
		jadetemplate = jade.compile(jadefile),
		content = jadetemplate(tplBody);
	return content;
}

function inArray(needle, arr) {
	var index = arr.indexOf(needle);
	var result = (index > -1) ? true : false;
	
	return result;
}

function delFromArray(needle, arr) {
	if (inArray(needle, arr)) {
		var index = arr.indexOf(needle);		
		arr.splice(index, 1);
		return arr;
	} else return false;	
}

//index listing of produit at :  /produits/
exports.index = function(req, res){	
	Model
		.find()
		.populate('salle_id promotion_id commandes')
		.exec(function(err, docs) {
		if(err) {
			throw err;
		} else if( (docs) && (docs.length) ) {
			res.render('produits/index', { title: 'Produits', docs: docs});
		} else {
			res.render('produits/index', { title: 'Produits', docs: null});
			
		}
	});
}

function salles () {
	return Deferred(function(defer){

		Salle.find({}, function(err, result){
			if (err) {
				defer.reject(err);
			} else {
				defer.resolve(result);
			}
		});
	}).promise();
}

function promotions () {
	return Deferred(function(defer){

		Promotion.find({}, function(err, result){
			if (err) {
				defer.reject(err);
			} else {
				defer.resolve(result);
			}
		});
	}).promise();
}

exports.new = function(req, res) {	
//	superController.new(req, res, model);
	var foreignModels = {};

	Deferred.when(salles(), promotions()).then(function(salle_list, promo_list){
		foreignModels.salle = salle_list;
		foreignModels.promotion = promo_list;

		options = {'title':'Ajouter un produit','action':'create','image':'', 'type': 'Ajouter', 'foreignModels':foreignModels};
		html =  renderTpl('views/forms/produits/new.jade', options);
		res.render('produits/new', {title: 'Ajouter un produit', body: html, foreignModels:foreignModels});
	});

	// ASYNC PARALLEL, remplacé par JQDeferred
	// async.parallel([
	// 	function (callback) {
	// 		return Salle.find({}, function(err, result){	// la liste de toutes les salles
	// 			foreignModels.salle = result;
	// 			return callback(err);
	// 		});
	// 	}, function(callback) {
	// 		return Promotion.find({}, function(err, result){	// la liste de toutes les promotions
	// 			foreignModels.promotion = result;
	// 			return callback(err);
	// 		});
	// 	}
	// ], function(err) {
	// 	options = {'title':'Ajouter un produit','action':'create','image':'', 'type': 'Ajouter', 'foreignModels':foreignModels};
	// 	html =  renderTpl('views/forms/produits/new.jade', options);
	// 	res.render('produits/new', {title: 'Ajouter un produit', body: html, foreignModels:foreignModels});
	// });

}

//add a produit
exports.create = function(req, res) {

	var salle_id = req.body.new_salle_id,
		promotion_id = (req.body.new_promotion_id) ? req.body.new_promotion_id : null;
	
	var produit = {
		title: req.body.produittitle,
		arrive: req.body.produitarrive,
		depart: req.body.produitdepart,
		salle_id: salle_id,	
		promotion_id: promotion_id,
		prix: req.body.produitprix,
		etat: 0,
	};
	
	modelObj = new Model(produit);

	modelObj.save(function(err, data){
		if(err) {
			res.render('generals/error', {title: "Echec de création", body: "Il n'est pas possible de créér ce produit ! Message : " + err.message});
		} else {
			Salle.findOne({'_id': salle_id}, function(err, salle){
				salle.produits.push(data._id);
				salle.save();				
			});
			if (promotion_id != null) {
				Promotion.findOne({'_id': promotion_id}, function(err, promo){
					promo.produits.push(data._id);
					promo.save();
				});
			}
		//	res.render('generals/modified', {title: 'Produit ajouté', body: "Le produit a bien été ajouté."});
			res.redirect('/produits');
		}
	});

};


//delete a produit
exports.destroy = function(req, res) {
	var ref = req.params.id,
		promotion = req.body.promotion,
		salle = req.body.salle;

	Model.remove({'_id': ref}, function(err){
		if(err) {
			res.render('generals/error', {title: "Echec de suppression", body: "Il n'y a pas de produit avec un identifient " + ref});
		} else {
			Salle.findOne({'_id': salle}, function(err, salle){
				var index = salle.produits.indexOf(ref);
				if (index != -1) {
					salle.produits.splice(index);
					salle.save();
				}				
			});
			if (promotion) {
				Promotion.findOne({'_id': promotion}, function(err, promo){
					var index = promo.produits.indexOf(ref);
					if (index != -1) {
						promo.produits.splice(index);
						promo.save();
					}
				});
			}
			res.render('generals/modified', {title: "Produit supprimé", body: "Le produit a bien été supprimé."});
		}
	});
};

//display edit form
exports.edit = function(req, res) {
	var ref = req.params.id,
		imagePath = '';
	
	Model.findOne({'_id': ref}, function(err, doc){
		if (err) {
			res.render('generals/error', {title: "Echec de modification", body: "Il n'y a pas de produit avec un identifient " + ref});
		} else {
			res.data = doc;
			
			var foreignModels = {};

			Deferred.when(salles(), promotions()).then(function(salle_list, promo_list){
				foreignModels.salle = salle_list;
				foreignModels.promotion = promo_list;

				var	options = {'title':'Modifier le produit', 'action': 'produits/edit/' + ref, 'image': imagePath + doc.image, 'type': 'Modifier', 'foreignModels':foreignModels},
				html = renderTpl('views/forms/produits/edit.jade', options);
				res.html = html;
				res.foreignModels = foreignModels;
				res.send({data: doc, html: html, foreignModels: foreignModels});
			});

			// ASYNC PARALLEL module, remplacé par JQDeferred
			// async.parallel([
			// 	function(callback) {
			// 		return Salle.find({}, function(err, result) {	//la liste de toutes les salles existantes
			// 			foreignModels.salle = result;
			// 				return callback(err);
			// 		});
			// 	}, function(callback) {
			// 		return Promotion.find({}, function(err, result) {	//la liste de toutes les promotions existantes
			// 			foreignModels.promotion = result;
			// 			return callback(err);
			// 		});
			// 	}
			// ], function(err) {
			// var	options = {'title':'Modifier le produit', 'action': 'produits/edit/' + ref, 'image': imagePath + doc.image, 'type': 'Modifier', 'foreignModels':foreignModels},
			// 	html = renderTpl('views/forms/produits/edit.jade', options);
			// 	res.html = html;
			// 	res.foreignModels = foreignModels;
			// 	res.send({data: doc, html: html, foreignModels: foreignModels});
			// });	//end async parallel


		}	//fin else
	});
};

//update a produit
exports.update = function(req, res) {
		
	var produit = {
			title: req.body.produittitle,
			arrive: req.body.produitarrive,
			depart: req.body.produitdepart,
			salle_id: req.body.new_salle_id,	
			promotion_id: (req.body.new_promotion_id) ? req.body.new_promotion_id : null,
			prix: req.body.produitprix,
			etat: req.body.produitetat,
		},
		foreignModels = ['Salle', 'Promotion'],
		ref = req.params.id;
	
	
	Model.update({'_id': ref}, produit, function(err, docs) {
		if (err) {
			res.render('generals/error',{title: "Problème avec la mise à jour: ", body: 'Message : ' + err});			
		} else {
			if (foreignModels) {
				for (var fm in foreignModels) {
					subModel = foreignModels[fm];

					//	exemple pour le model Produit les submodels sont Salle, Promotion
					var SMLower = subModel.toLowerCase(),	//	ex. SMLower = salle, ensuite promotion
						SM = require('../models/' + SMLower +'s.js'),	//	ex. SM = require('../models/salles.js) et ensuite SM = require('../models/promotions.js)
						SMOld = "old_" + SMLower + "_id",	//  ex. SMOld = old_salle_id, et old_promotion_id
						SMNew = "new_" + SMLower + "_id";	//  ex. SMNew = new_salle_id, et new_promotion_id
					var old_object = {};
					var new_object = {};
					var docs = req.body;
					
					// creer deux objets à partir du req.body pour ensuite les utiliser dans findOne
					// en cas d'un seul model on aurait fait: req.body.old_salle_id et req.body.new_salle_id et dans le findOne:
					// Salle.findOne({'_id': req.body.old_salle_id}, callback)
					for ( d in docs) {
						if ( d == SMOld ) {
							old_object["_id"] = docs[d];
						}
						if ( d == SMNew ) {
							new_object["_id"] = docs[d];
						}
					}

					if (new_object["_id"] !== old_object["_id"] ) {	// si il ya a eu un changement du foreign model id
						if (old_object["_id"]) {	// cette verification est util notemment pour un produit auquel aucun promotion n'était associé
							SM.findOne(old_object, function(err, data){
								// de la liste des produits de cette salle enlever le id (le ref) de ce produit
								delFromArray(ref, data['produits']);	// ex. data.produits
								data.save();
							});
						}
						
						// enregistrer le id de la salle passée en parametre (TODO faire la verif si il y a changement de l id de la salle avant de faire ca
						if (new_object["_id"]) {	// cette verification est utile notemment pour un produit auquel on n'asscie plus de promotion
							SM.findOne(new_object, function(err, data){
							//	var produits = data.produits;
								if (!inArray(ref, data['produits'])) {
									data['produits'].push(ref);
								}
								data.save();
							});
						}
					}
				}	//endOf for
			}
	//		res.render('generals/modified', {title: "Produit modifié", body: "Le produit a bien été modifié."});
			res.redirect('produits/');
		}
	});
};

//show a produit
exports.show = function(req, res) {			
	ref = req.params.id;

	Model.findOne({'_id': ref})
		.populate('salle_id promotion_id commandes')
		.exec(function(err, doc){	
		if(err) {
			throw err;
		} else {
			var opts = {
					path:'salle_id.commentaires',
					model: 'Commentaires'
				}
			
			Model.populate(doc, opts, function(err, docs){
				var options = {
					path: 'salle_id.commentaires.membre_id',
					model: 'Membres'
				}
				
				Model.populate(docs, options, function(err, datas){
					if (!doc) {
						res.render('produits/show', {id: ref, title:'Détailles du produit', data: datas});
					} else {
						res.render('produits/show', {title: 'Détailles du produit', data: datas});
					}
				});
			});
		}
	});
}






























