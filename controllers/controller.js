var mongoose = require('mongoose'),
	Deferred = require('JQDeferred'),
	fs = require('fs'),
	jade = require('jade'),
	async = require('async');
//http://docs.mongodb.org/manual/tutorial/create-an-auto-incrementing-field/

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

function getForeignModelNames(docs, model) {
	var foreignModels = new Array();
	var docs = (docs[0]) ? docs[0] : docs;
	
	for ( d in docs) {
		if ( d.indexOf("_id") !== -1 ) {
			var collectionName = d.substring(0, d.indexOf("_id"));
			if ((collectionName != model) && (collectionName != '_')) {
				foreignModels.push(collectionName);
			}
		}
	}
	return foreignModels;
}

function getModelDetails(model) {
	var femModels = ['salles','promotions', 'commandes'],
		mascModels = ['produits', 'membres', 'commentaires'],
//		modelsWithForeignKeys = ['produits', 'commandes', 'commentaires'],
		lastChar = model.slice(-1),
		modelFile = (lastChar == 's') ? '../models/' + model.toLowerCase() + '.js' : '../models/' + model.toLowerCase() + 's.js',	// ex.: /models/salles.js
		modelName = (lastChar == 's') ? model.toLowerCase() : model.toLowerCase() + 's',						// ex.: salles
//		modelReferenceName = model.toLowerCase()+'reference',			// ex.: sallereference
		modelGenre = '',
		suffix = '',
		articleDef = 'le ',
		articleIndef = 'un ',
		hasForeignKey = false;
				
		if (inArray(modelName, femModels)) {
			modelGenre = 'f';
			suffix = 'e ';
			articleDef = 'la ';
			articleIndef = 'une ';
		} else if (inArray(modelName, mascModels)) {
			modelGenre = 'm';
		}
		/*
		if (inArray(modelName, modelsWithForeignKeys)) {
			hasForeignKey = true;
			getForeignModelNames(, )
		}
	*/
	return {
				'modelFile': modelFile, 
				'modelName': modelName, 
				'modelGenre': modelGenre, 
				'articleDef': articleDef, 
				'articleIndef': articleIndef, 
				'suffix': suffix
			};
}

function firstToUpper(str) {
    return str.substr(0, 1).toUpperCase() + str.substr(1);    
}

function renderTpl(tplName, tplBody){
	var jadefile = fs.readFileSync(tplName),
		jadetemplate = jade.compile(jadefile),
		content = jadetemplate(tplBody);
	return content;
}

function personiliseTpl(tpl,obj) {
	for (var p in obj) {
	
		var k='{'+p+'}';
		var v=obj[p];
		tpl = tpl.replace(k, v);
	}
	return tpl;
}

function getModelInfo(model, ref, callback) {
	
	var Model = firstToUpper(model),
		reference = model + "s"+"reference"
		refObj[reference] = ref;
	
	Model.findOne(refObj).exec(callback);
}

//index listing of {model} at :  /models/
exports.index = function(req, res, model){

	var modelDetails = getModelDetails(model),
		Model = require(modelDetails.modelFile),		// voir comment mieux factoriser pour faire require qu'une fois dans ce fichier
		modelName = modelDetails.modelName
//		refName = modelDetails.modelReferenceName,
	//	foreignModels = new Array()
		
	var obj = {};
	
//	var Salle = require('../models/salles.js');

 /*
	var performers = {};
async.parallel([
  function(callback) {
    return Salle.findOne({}, function(err, result) {
      performers.salle = result;
      return callback(err);
    });
  }, function(callback) {
    return Model.findOne({}, function(err, result) {
      performers.produit = result;
      return callback(err);
    });
  }
], function(err) {
  return res.json(performers);
});
*
//	 .done(callback).when(callback)
Deferred.when([
  function(callback) {
    return Salle.findOne({}, function(err, result) {
      performers.salle = result;
      return callback(err);
    });
  }, function(callback) {
    return Model.findOne({}, function(err, result) {
      performers.produit = result;
      return callback(err);
    });
  }
], function(err) {
  return res.json(performers);
}).then(function(){});
*/
 /*
 	Model.find({}, function(err, docs){
			forModels = getForeignModelNames(docs, model);
			
			Model.find()
			.populate(function(){
				return 
			})		
			for (var m=0; m<forModels.length; m++){
				if (forModels[m]) {
					var s = forModels[m]+'_id';
					.populate(s)
				}
			}
			.exec(function(err, docs) {
				if(err) {
					throw err;
				} else if( (docs) && (docs.length) ) {
			
					res.render(modelName+'/index', { title: firstToUpper(modelName), docs: docs});
				} else {
					res.render(modelName+'/index', { title: firstToUpper(modelName), docs: null});
				}
			});					
	});			
				
					
					
					
					
				} else {
					Model.find({}, function(err, docs) {
						if(err) {
							throw err;
						} else if( (docs) && (docs.length) ) {
							
							res.render(modelName+'/index', { title: firstToUpper(modelName), docs: docs});
						} else {
							res.render(modelName+'/index', { title: firstToUpper(modelName), docs: null});
						}
					});
				}
			}
	});
*/

	Model
		.find()
		.populate('salle_id')
		.populate('promotion_id')
		.populate('membre_id')
		.exec(function(err, docs) {
		if(err) {
			throw err;
		} else if( (docs) && (docs.length) ) {
			res.render(modelName+'/index', { title: firstToUpper(modelName), docs: docs});
		} else {
			res.render(modelName+'/index', { title: firstToUpper(modelName), docs: null});
		}
	});
	
/*
	if (modelName == 'produits') { 	
		Model
		.find()
		.populate('salle_id')
		.populate('promotion_id')
		.exec(function(err, docs) {
		if(err) {
			throw err;
		} else if( (docs) && (docs.length) ) {
			res.render(modelName+'/index', { title: firstToUpper(modelName), docs: docs});
		} else {
			res.render(modelName+'/index', { title: firstToUpper(modelName), docs: null});
		}
	});
	} else {
		Model.find({}, function(err, docs) {
			if(err) {
				throw err;
			} else if( (docs) && (docs.length) ) {
				res.render(modelName+'/index', { title: firstToUpper(modelName), docs: docs});
			} else {
				res.render(modelName+'/index', { title: firstToUpper(modelName), docs: null});
			}
		});
	}	//fin else
	*/
}

//display new model form - route : /models/new 
exports.new = function(req, res, model) {

	var modelDetails = getModelDetails(model),
		Model = require(modelDetails.modelFile),
		modelName = modelDetails.modelName,
		modelLower = model.toLowerCase(),
		articleIndef = modelDetails.articleIndef,
		options = {};
		
//	var content =  renderTpl('views/forms/form-'+ modelLower +'.jade', ""); 		// TODO: A voir
//		html = personiliseTpl(content,options);
		
	if (modelName == 'produits') {
		var Salle = require('../models/salles.js'),
			Promotion = require('../models/promotions.js'),
			foreignModels = {};
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
			options = {'title':'Ajouter '+ articleIndef + model.toLowerCase(),'action':'create','image':'', 'type': 'Ajouter', 'foreignModels':foreignModels};
			html =  renderTpl('views/forms/form-'+ modelLower +'.jade', options);
			res.render(modelName+'/new', {title: 'Ajouter ' + articleIndef + model.toLowerCase(), body: html, foreignModels:foreignModels});
		});
		
	} else {
		var options = {'title':'Ajouter '+ articleIndef + model.toLowerCase(),'action':'create','image':'', 'type': 'Ajouter'},
			html =  renderTpl('views/forms/form-'+ modelLower +'.jade', options);
			res.render(modelName+'/new', {title: 'Ajouter ' + articleIndef + model.toLowerCase(), body: html});
	}
}

//add a {model}, route : /models/create	(post)
exports.create = function(req, res, model, obj) {

	var modelDetails = getModelDetails(model),
		Model = require(modelDetails.modelFile),
		modelName = modelDetails.modelName,
		suffix = modelDetails.suffix,
		articleDef = modelDetails.articleDef
		modelToLower = model.toLowerCase(),
		modelObj = new Model(obj);
		
		modelObj.save(function(err, data){
			if(err) {
				res.render('error', {title: "Echec de création", body: "Il n'est pas possible de créér " + articleDef + model.toLowerCase() + " ! Message : " + err.message});
			} else {
				res.render('generals/modified', {title: model + ' ajouté'+ suffix, body: firstToUpper(articleDef) + model.toLowerCase() +" a bien été ajouté" + suffix + "."});
			}
		});
		

/*	Model.findOne().sort("-" + modelToLower + "reference").exec(function(err, doc) {	//find the maximum reference number
	//	console.log(doc[refName]);
		
		obj[refName] = doc[refName] + 1;
		var modelObj = new Model(obj);
				
		modelObj.save(function(err, data){
			if(err) {
				res.render('error', {title: "Echec de création", body: "Il n'est pas possible de créér " + articleDef + model.toLowerCase() + " ! Message : " + err.message});
			} else {
				res.render('generals/modified', {title: model + ' ajouté'+ suffix, body: firstToUpper(articleDef) + model.toLowerCase() +" a bien été ajouté" + suffix + "."});
			}
		});
	});
	*/
};

//display edit form, route : /models/edit/id
exports.edit = function(req, res, model, imagePath) {
	var modelDetails = getModelDetails(model),	//ex Salle
		Model = require(modelDetails.modelFile),
		modelName = modelDetails.modelName,// ex.: salles
		modelFile = modelDetails.modelFile,	// ex.: /models/salles.js
		ref = req.params.id,
		modelLower = model.toLowerCase(),
		articleDef = modelDetails.articleDef,
		options = {};
		
	Model.findOne({'_id': ref}, function(err, doc){
		if (err) {
			res.render('error', {title: "Echec de modification", body: "Il n'y a pas de " + modelLower + " avec un identifient " + ref});
		} else {
			res.data = doc;
			
			if (modelName == 'produits'){
				var Salle = require('../models/salles.js'),
					Promotion = require('../models/promotions.js'),
					foreignModels = {};
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
				var	options = {'title':'Modifier '+ articleDef + modelLower, 'action': modelName + '/' + ref, 'image': imagePath + doc.image, 'type': 'Modifier', 'foreignModels':foreignModels},
					html = renderTpl('views/forms/form-'+ modelLower +'.jade', options);
					res.html = html;
					res.foreignModels = foreignModels;
					res.send({data: doc, html: html, foreignModels: foreignModels});
				});	//end async parallel
			} else {
			var	options = {'title':'Modifier '+ articleDef + modelLower, 'action': modelName + '/' + ref, 'image': imagePath + doc.image, 'type': 'Modifier'},
		//		html = renderTpl('views/forms/form-'+ modelLower +'.jade', req.body);
				html = renderTpl('views/forms/form-'+ modelLower +'.jade', options);
				res.html = html;
				res.send({data: doc, html: html});	
			}	// fin else
		}	//fin else
	});
};

//update a {model}, route /models/id (post)
exports.update = function(req, res, model, obj, foreignModels) {
	var modelDetails = getModelDetails(model),
		Model = require(modelDetails.modelFile),
		modelName = modelDetails.modelName,
		suffix = modelDetails.suffix,
		refName = modelDetails.modelReferenceName,
		ref = req.params.id,
		modelLower = model.toLowerCase(),
		articleDef = modelDetails.articleDef,
		obj = {};
	obj[refName] = ref;
	var modelObj = {};
	modelObj[ refName ] = ref;
	
	Model.update({'_id': ref}, obj, function(err, docs) {
		if (err) {
			res.send("Problème avec la mise à jour: " + err);
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

//show a {model}, route /models/id (get)
exports.show = function(req, res, model) {
	var modelDetails = getModelDetails(model),
		Model = require(modelDetails.modelFile),
		modelName = modelDetails.modelName,
			suffix = modelDetails.suffix,
			refName = modelDetails.modelReferenceName,
			modelLower = model.toLowerCase(),
			articleDef = modelDetails.articleDef,
			article = (articleDef == 'le ') ? 'du ' : 'de la ',
			ref = req.params.id
		;

	Model.findOne({'_id': ref})
		.populate('salle_id')
		.populate('promotion_id')
		.populate('membres_id')
		.populate('commentaires')
		.populate('commandes')
		.populate('produit_id')
		.exec(function(err, doc){	
		if(err) {
			throw err;
		} else {
			if (!doc) {
				res.render(modelName + '/show', {id: ref, title:'Détailles ' + article + modelLower, data:doc});
			} else {
				res.render(modelName + '/show', {title: 'Détailles ' + article + modelLower, data: doc});
			}
		}
	});
}

//display delete form, route: /models/delete/id (post)
exports.delete = function(req, res, model) {
	var modelDetails = getModelDetails(model),
		Model = require(modelDetails.modelFile),
		modelName = modelDetails.modelName,
		articleIndef = modelDetails.articleIndef,
		modelLower = model.toLowerCase(),
		reference = req.params.id;
		
	Model.findOne({'_id': reference}, function(err, doc){
		if (err) {
			res.render('error', {title: "Echec", body: err});
		} else {
			res.render('generals/deletePopup', {title: "Suppression d'" + articleIndef + modelLower, type: modelLower, id: reference, type_datas: doc});
		}
	});
};

//delete a {model}, route; /models/destroy/_id
exports.destroy = function(req, res, model) {
	var modelDetails = getModelDetails(model),
		Model = require(modelDetails.modelFile),
		modelName = modelDetails.modelName,
		articleDef = modelDetails.articleDef,
		modelLower = model.toLowerCase()
		suffix = modelDetails.suffix,
		ref = req.params.id;
		/*
		modelObject = {};
		modelObject[ refName ] = ref;
		*/
	Model.remove({'_id': ref}, function(err){
		if(err) {
			res.render('error', {title: "Echec de suppression", body: "Il n'y a pas de " + modelLower + " avec un identifient " + ref});
		} else {
			res.render('generals/modified', {title: model + " supprimé" + suffix, body: firstToUpper(articleDef) + modelLower + " a bien été supprimé" + suffix + "."});
		}
	});
};






































