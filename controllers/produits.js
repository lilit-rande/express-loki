//The promotions controller
var superController = require('../controllers/controller.js'),
	model = 'Produit',	
	Salle = require('../models/salles.js'),
	Produit = require('../models/produits.js');

//index listing of produit at :  /produits/
// AFFICHAGE OK. TODO VOIR POUR LES CLES ETRANGERES
exports.index = function(req, res){	
	superController.index(req, res, model);
}

//display new promo form
exports.new = function(req, res) {	
	superController.new(req, res, model);
}

//add a produit
exports.create = function(req, res) {
	var promotion = {
		code: req.body.promotioncode,
		reduction: req.body.promotionreduction
	};

	superController.create(req, res, model, promotion);
};

//OK
//display delete form
exports.delete = function(req, res) {
	superController.delete(req, res, model);
};

//OK
//delete a produit
exports.destroy = function(req, res) {
	superController.destroy(req, res, model);
};


function renderTpl(tplName, tplBody){
	var jadefile = fs.readFileSync(tplName),
		jadetemplate = jade.compile(jadefile),
		content = jadetemplate(tplBody);
	return content;
}


//display edit form
exports.edit = function(req, res) {
	imagePath = '';
	superController.edit(req, res, model, imagePath);
/*	
	var
	ref = req.params.id,
	content =  renderTpl('views/forms/form-produit.jade', req.body); 
	
var modelObj = {};
	modelObj[ refName ] = ref;
Model.findOne(modelObj, function(err, doc){
	if (err) {
		res.render('error', {title: "Echec de modification", body: "Il n'y a pas de " + modelLower + " avec un identifient " + ref});
	} else {
		var options = {'title':'Modifier produit', 'action': 'produit/' + ref, 'image': imagePath + doc.image, 'type': 'Modifier'},
		html = personiliseTpl(content, options);
		res.data = doc;
		res.html = html;
		res.send({data: doc, html: html});
	}
});*/
};

//update a produit
exports.update = function(req, res) {
	var promotion = {
		code: req.body.promotioncode,
		reduction: req.body.promotionreduction
	};

	superController.update(req, res, model, promotion);
};

//show a produit
exports.show = function(req, res) {
	superController.show(req, res, model);
}