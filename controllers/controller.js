var mongoose = require('mongoose'),
	Deferred = require('JQDeferred'),
	fs = require('fs'),
	jade = require('jade'),
	async = require('async');
//http://docs.mongodb.org/manual/tutorial/create-an-auto-incrementing-field/

function inArray(needle, arr) {
	for (var k in arr) {
		if (arr[k] == needle) {
			return true;
		}
	}
	return false;
}

function getForeignModelNames(docs, model) {
	var foreignModels = new Array();
	var docs = (docs[0]) ? docs[0] : docs;
	
	for ( d in docs) {
		if ( d.indexOf("_id") !== -1 ) {
			var collectionName = d.substring(0, d.indexOf("_id"));
			if ((collectionName != model) && (collectionName != '_') && (collectionName != '_')) {
				foreignModels.push(collectionName);
			}
		}
	}
	return foreignModels;
}

function getModelDetails(model) {
	var femModels = ['salles','promotions', 'commandes'],
		mascModels = ['produits', 'membres', 'avis'],
//		modelsWithForeignKeys = ['produits', 'commandes', 'avis'],
		modelFile = '../models/' + model.toLowerCase() + 's.js',	// ex.: /models/salles.js
		modelName = model.toLowerCase() + 's',						// ex.: salles
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
  console.log(performers);
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
  console.log(performers);
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
				//	console.log(docs);
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
					//		console.log(docs);			
							
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
		.populate('membres_id')
		.exec(function(err, docs) {
		if(err) {
			throw err;
		} else if( (docs) && (docs.length) ) {
		//	forModels = getForeignModelNames(docs, model);
		//	console.log(forModels);
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
		//	console.log(docs);
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
		//		console.log(docs);			
				
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
		articleIndef = modelDetails.articleIndef;
		
	var content =  renderTpl('views/forms/form-'+ modelLower +'.jade', ""), 		// TODO: A voir
		options = {'title':'Ajouter '+ articleIndef + model.toLowerCase(),'action':'create','image':'', 'type': 'Ajouter'},
		html = personiliseTpl(content,options);
	
	res.render(modelName+'/new', {title: 'Ajouter ' + articleIndef + model.toLowerCase(), body: html});
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
			//	console.log(err);
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
			//	console.log(err);
				res.render('error', {title: "Echec de création", body: "Il n'est pas possible de créér " + articleDef + model.toLowerCase() + " ! Message : " + err.message});
			} else {
				res.render('generals/modified', {title: model + ' ajouté'+ suffix, body: firstToUpper(articleDef) + model.toLowerCase() +" a bien été ajouté" + suffix + "."});
			}
		});
	});
	*/
};

//display delete form, route: /models/delete/id (post)
exports.delete = function(req, res, model) {
	var modelDetails = getModelDetails(model),
		Model = require(modelDetails.modelFile),
		modelName = modelDetails.modelName,
		articleIndef = modelDetails.articleIndef,
		reference = req.params.id;
		modelLower = model.toLowerCase();
		
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
		ref = req.params.id,
		articleDef = modelDetails.articleDef,
		modelLower = model.toLowerCase()
		suffix = modelDetails.suffix;
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

//display edit form, route : /models/edit/id
exports.edit = function(req, res, model, imagePath) {
	var modelDetails = getModelDetails(model),	//ex Salle
		Model = require(modelDetails.modelFile),
		modelName = modelDetails.modelName,// ex.: salles
		modelFile = modelDetails.modelFile,	// ex.: /models/salles.js
		ref = req.params.id,
		modelLower = model.toLowerCase(),
		articleDef = modelDetails.articleDef,
		content =  renderTpl('views/forms/form-'+ modelLower +'.jade', req.body); 		// TODO: A voir
		
		
	Model.findOne({'_id': ref}, function(err, doc){
		if (err) {
			res.render('error', {title: "Echec de modification", body: "Il n'y a pas de " + modelLower + " avec un identifient " + ref});
		} else {
			var options = {'title':'Modifier '+ articleDef + modelLower, 'action': modelName + '/' + ref, 'image': imagePath + doc.image, 'type': 'Modifier'},
			html = personiliseTpl(content, options);
			res.data = doc;
			res.html = html;

			if (modelName == 'produits'){
				var Salle = require('../models/salles.js'),
					Promotion = require('../models/promotions.js'),
					foreignModels = {};
				async.parallel([
					function(callback) {
						return Salle.find({}, function(err, result) {
							foreignModels.salle = result;
								return callback(err);
						});
					}, function(callback) {
						return Promotion.find({}, function(err, result) {
							foreignModels.promotion = result;
							return callback(err);
						});
					}
				], function(err) {
				// return res.json(foreignModels);
					res.foreignModels = foreignModels;
					res.send({data: doc, html: html, foreignModels: foreignModels});
				});	//end async parallel
			} else {
				res.send({data: doc, html: html});	
			}	// fin else
		}	//fin else
	});
};

//update a {model}, route /models/id (post)
exports.update = function(req, res, model, obj) {
	function replaceValueInArray(array, oldValue, newValue) {
		if (inArray(oldValue, array)) {
			var oldValueIndex = array.indexOf(oldValue);
			array[oldValueIndex] = newValue;
			return array;
		} else return false;
	}
	var modelDetails = getModelDetails(model),
			Model = require(modelDetails.modelFile),
			modelName = modelDetails.modelName,
			suffix = modelDetails.suffix,
			refName = modelDetails.modelReferenceName,
			ref = req.params.id,
			modelLower = model.toLowerCase(),
			articleDef = modelDetails.articleDef;
	
	obj[refName] = ref;
	var modelObj = {};
	modelObj[ refName ] = ref;
	
	Model.update({'_id': ref}, obj, function(err) {
		if (err) {
			res.send("Problème avec la mise à jour: " + err);
		} else {
			if(modelName == 'produits') {
				var Salle = require('../models/salles.js'),
					Promotion = require('../models/promotions.js');
				console.log("salle id= " + req.body.salle_id);
				Salle.findOne({"_id": req.body.salle_id}, function(err, data){
					console.log("salle produits = " + data.produits);
					
					data.produits = replaceValueInArray(data.produits, ref, req.body.salle_id);
					data.save(function(err){
						if(err) {
							console.log(err);
						}
					});
					
					// une fois on click sur modifier
					// recuperer le id de la salle choisi ainsi que le id du produit en cours
					// Salle.findOne(by id) verifier si le produit id n'est pas dans l'array produits alors faire push
					// enlever le produit id du tableau de l'ancienne salle
					
			//		var arr = data.produits;
			//		var a = replaceValueInArray(data.produits, ref, req.body.salle_id);
			//		console.log("new = " + a);
			//		data.produits = replaceValueInArray(data.produits, ref, req.body.salle_id);
			//		data.save(function(err){
			//			if(err) {
			//				console.log(err);
			//			}
			//		});
					/*
					if (inArray(ref, arr)) {
						var index = arr.indexOf(ref);
						console.log(index);
						console.log(arr[index]);
					}
					console.log(data.produits);
					*/
				});
				
			}
		
		
		
			res.render('generals/modified', {title: model + " modifié" + suffix, body: firstToUpper(articleDef) + modelLower + " a bien été modifié" + suffix + "."});
		}
	});
};

//show a {model}, route /models/id (get)
exports.show = function(req, res, model) {
	var ref = req.params.id,
		modelDetails = getModelDetails(model),
		Model = require(modelDetails.modelFile),
		modelName = modelDetails.modelName,
			suffix = modelDetails.suffix,
			refName = modelDetails.modelReferenceName,
			ref = req.params.id,
			modelLower = model.toLowerCase(),
			articleDef = modelDetails.articleDef
		;
		
	Model.findOne({'_id': ref}, function(err, doc){	
		if(err) {
			throw err;
		} else {
			if (!doc) {
				res.render(modelName + '/show', {id: ref, title:'Détailles de ' + articleDef + modelLower, data:doc});
			} else {
				res.render(modelName + '/show', {title: 'Détailles de ' + articleDef + modelLower, data: doc});
			}
		}
	});
}








































