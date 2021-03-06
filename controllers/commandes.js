//The promotions controller
var Model = require('../models/commandes.js'),	
	Membre =require('../models/membres.js'),
	Produit = require('../models/produits.js'),	
	Salle = require('../models/salles.js'),
	fs = require('fs'),
	jade = require('jade');
	

function renderTpl(tplName, tplBody){
/*
	var jadefile = fs.readFileSync(tplName),
		jadetemplate = jade.compile(jadefile),
		content = jadetemplate(tplBody);
	return content;
*/
}

function inArray(needle, arr) {
/*
	var index = arr.indexOf(needle);
	var result = (index > -1) ? true : false;
	
	return result;
*/
}

function delFromArray(needle, arr) {
/*
	if (inArray(needle, arr)) {
		var index = arr.indexOf(needle);		
		arr.splice(index, 1);
		return arr;
	} else return false;	
*/
}


/*
exports.index = function(req, res){	
	Model
	.find()
	.exec(function(err, commandes) {

		if (err) {
			throw err; 
		} else {
			if ( (commandes) && (commandes.length) ) {
				res.render('commandes/index', { title: 'Commandes', docs: commandes});
			} else {
				res.render('commandes/index', { title: 'Commandes', docs: null});
			}
		}
	});
}
*/
exports.index = function(req, res){	
	Model
	.find()
	.populate('membre_id produit_id')
	.exec(function(err, commandes) {
		var opts = {
			path: 'produit_id.salle_id', 
			model: 'Salles'
		}

		Model.populate(commandes, opts, function(err, docs){
			if (err) {
				throw err; 
			} else {
				if( (commandes) && (commandes.length) ) {
					res.render('commandes/index', { title: 'Commandes', docs: commandes});
				} else {
					res.render('commandes/index', { title: 'Commandes', docs: null});
				}
			}
		});
	});
}

exports.new = function(req, res) {	
/*
//	superController.new(req, res, model);
	var foreignModels = {};

	async.parallel([
		function (callback) {
			return Salle.find({}, function(err, result){	// la liste de toutes les salles
				foreignModels.salle = result;
				return callback(err);
			});
		}, function(callback) {
			return Promotion.find({}, function(err, result){	// la liste de toutes les promotions
				foreignModels.promotion = result;
				return callback(err);
			});
		}
	], function(err) {
		options = {'title':'Ajouter un produit','action':'create','image':'', 'type': 'Ajouter', 'foreignModels':foreignModels};
		html =  renderTpl('views/forms/produits/new.jade', options);
		res.render('produits/new', {title: 'Ajouter un produit', body: html, foreignModels:foreignModels});
	});
	*/
}

//add a produit
exports.create = function(req, res) {
		/*
	var produit = {
		title: req.body.produittitle,
		arrive: req.body.produitarrive,
		depart: req.body.produitdepart,
		salle_id: req.body.new_salle_id,	
		promotion_id: (req.body.new_promotion_id) ? req.body.new_promotion_id : null,
		prix: req.body.produitprix,
		etat: 0,
	};
	
	modelObj = new Model(produit);
	
	modelObj.save(function(err, data){
		if(err) {
		
			res.render('generals/error', {title: "Echec de création", body: "Il n'est pas possible de créér ce produit ! Message : " + err.message});
		} else {
		//	res.render('generals/modified', {title: 'Produit ajouté', body: "Le produit a bien été ajouté."});
			res.redirect('/produits');
		}
	});
	*/
};


//delete a produit
exports.destroy = function(req, res) {
/*
	var ref = req.params.id;
	
	Model.remove({'_id': ref}, function(err){
		if(err) {
			res.render('generals/error', {title: "Echec de suppression", body: "Il n'y a pas de produit avec un identifient " + ref});
		} else {
			res.render('generals/modified', {title: "Produit supprimé", body: "Le produit a bien été supprimé."});
		}
	});
	*/
};


//OK
//display edit form
exports.edit = function(req, res) {
/*
	var ref = req.params.id,
		imagePath = '';
	
	Model.findOne({'_id': ref}, function(err, doc){
		if (err) {
			res.render('generals/error', {title: "Echec de modification", body: "Il n'y a pas de produit avec un identifient " + ref});
		} else {
			res.data = doc;
			
			var foreignModels = {};
			async.parallel([
				function(callback) {
					return Salle.find({}, function(err, result) {	//la liste de toutes les salles existantes
						foreignModels.salle = result;
							return callback(err);
					});
				}, function(callback) {
					return Promotion.find({}, function(err, result) {	//la liste de toutes les promotions existantes
						foreignModels.promotion = result;
						return callback(err);
					});
				}
			], function(err) {
			var	options = {'title':'Modifier le produit', 'action': 'produits/edit/' + ref, 'image': imagePath + doc.image, 'type': 'Modifier', 'foreignModels':foreignModels},
				html = renderTpl('views/forms/produits/edit.jade', options);
				res.html = html;
				res.foreignModels = foreignModels;
				res.send({data: doc, html: html, foreignModels: foreignModels});
			});	//end async parallel
		}	//fin else
	});
	*/
};

//update a produit
exports.update = function(req, res) {
/*		
	var produit = {
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
*/
};

//show a produit
exports.show = function(req, res) {			
	/*
	ref = req.params.id;

	Model.findOne({'_id': ref})
		.populate('salle_id')
		.populate('promotion_id')
		.populate('commandes')
		.exec(function(err, doc){	
		if(err) {
			throw err;
		} else {
			if (!doc) {
				res.render('produits/show', {id: ref, title:'Détailles du produit', data:doc});
			} else {
				res.render('produits/show', {title: 'Détailles du produit', data: doc});
			}
		}
	});
	*/
}































