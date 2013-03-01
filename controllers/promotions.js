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
	var options = {'title':'Ajouter un code de promotion','action':'create','image':'', 'type': 'Ajouter'},
		html =  renderTpl('views/forms/form-promotion.jade', options);
	
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
			//	console.log(err);
			res.render('generals/error', {title: "Echec de création", body: "Il n'est pas possible de créér cette promotion ! Message : " + err.message});
		} else {
			res.render('generals/modified', {title: 'Code de promotion ajouté', body: "Le code de promotion a bien été ajouté."});
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
			res.render('generals/deletePopup', {title: "Suppression d'une promotion", type: 'promotion', id: reference, type_datas: doc});
		}
	});
};

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
			
			var	options = {'title':'Modifier le code promotion', 'action': 'promotions/'+ref, 'image': imagePath + doc.image, 'type': 'Modifier'},
				html = renderTpl('views/forms/form-promotion.jade', options);
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
		foreignModels = [],
		ref = req.params.id;
		obj[refName] = ref;
	var modelObj = {};
	modelObj[ refName ] = ref;
	
	Model.update({'_id': ref}, promotion, function(err, docs) {
		if (err) {
			res.render('generals/error',{title: "Problème avec la mise à jour: ", body: 'Message : ' + err});
		} else {
			if (foreignModels) {
				for (var fm in foreignModels) {
					subModel = foreignModels[fm];
					SMDetails = getModelDetails(subModel);

					//	exemple pour le model Produit les submodels sont Salle, Promotion
					var SM = require(SMDetails.modelFile),	//	ex. SM = require('../models/salles.js) et ensuite SM = require('../models/promotions.js)
						SMLower = subModel.toLowerCase(),	//	ex. SMLower = salles, ensuite promotions
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
								delFromArray(ref, data[modelName]);	// ex. data.produits
								data.save();
							});
						}
						
						// enregistrer le id de la salle passée en parametre (TODO faire la verif si il y a changement de l id de la salle avant de faire ca
						if (new_object["_id"]) {	// cette verification est utile notemment pour un produit auquel on n'asscie plus de promotion
	//					console.log(new_object["_id"]);
							SM.findOne(new_object, function(err, data){
							//	var produits = data.produits;
								if (!inArray(ref, data[modelName])) {
									data[modelName].push(ref);
								}
								data.save();
							});
						}
					}
				}	//endOf for
			}
			res.render('generals/modified', {title: model + " modifié" + suffix, body: firstToUpper(articleDef) + modelLower + " a bien été modifié" + suffix + "."});
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