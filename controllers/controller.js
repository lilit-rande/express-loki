var mongoose = require('mongoose'),
	Deferred = require('JQDeferred'),
	fs = require('fs'),
	jade = require('jade');
//http://docs.mongodb.org/manual/tutorial/create-an-auto-incrementing-field/

function inArray(needle, arr) {
	for (var k in arr) {
		if (arr[k] == needle) {
			return true;
		}
	}
	return false;
}

function getModelDetails(model) {
	var femModels = ['salles','promotions', 'commandes'],
		mascModels = ['produits', 'membres', 'avis'];
	
	var modelFile = '../models/' + model.toLowerCase() + 's.js',	// ex.: /models/salles.js
		modelName = model.toLowerCase() + 's',						// ex.: salles
//		modelReferenceName = model.toLowerCase()+'reference',			// ex.: sallereference
		modelGenre = '',
		suffix = '',
		articleDef = 'le ',
		articleIndef = 'un ';
				
		if (inArray(modelName, femModels)) {
			modelGenre = 'f';
			suffix = 'e ';
			articleDef = 'la ';
			articleIndef = 'une ';
		} else if (inArray(modelName, mascModels)) {
			modelGenre = 'm';
		}
	
	return {'modelFile': modelFile, 'modelName': modelName, 'modelGenre': modelGenre, 'articleDef': articleDef, 'articleIndef': articleIndef, 'suffix': suffix};
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

function getForeignModelNames(docs, model) {
	var foreignModels = new Array();
	for ( d in docs[0]) {
		if ( d.indexOf("reference") !== -1 ) {
			var collectionName = d.substring(0, d.indexOf("reference"));
			if (collectionName != model) {
				foreignModels.push(collectionName);
			}
		}
	}
	return foreignModels;
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
		modelName = modelDetails.modelName,
//		refName = modelDetails.modelReferenceName,
		foreignModels = new Array();
	var obj = {};
	Model.find({}, function(err, docs) {
		if(err) {
			throw err;
		} else if( (docs) && (docs.length) ) {
		
		//http://fr.slideshare.net/kbanker/mongodb-schema-design
		
			res.render(modelName+'/index', { title: firstToUpper(modelName), docs: docs});
		} else {
			res.render(modelName+'/index', { title: firstToUpper(modelName), docs: null});
		}
	});
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
		
/*
	Model.findOne().sort("-" + modelToLower + "reference").exec(function(err, doc) {	//find the maximum reference number
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
			res.partial('generals/deletePopup', {title: "Suppression d'" + articleIndef + modelLower, type: modelLower, id: reference, type_datas: doc});
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
	var modelDetails = getModelDetails(model),
		Model = require(modelDetails.modelFile),
		modelName = modelDetails.modelName,
		modelFile = modelDetails.modelFile,
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
			res.send({data: doc, html: html});
		}
	});
};

//update a {model}, route /models/id (post)
exports.update = function(req, res, model, obj) {

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
//	console.log(obj);
	Model.update({'_id': ref}, obj, function(err) {
		if (err) {
			res.send("Problème avec la mise à jour: " + err);
		} else {
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
	var modelObj = {};
	modelObj[refName] = ref;
	Model.findOne(modelObj, function(err, doc){	
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






































