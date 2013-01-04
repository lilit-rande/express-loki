//The promotions controller
var superController = require('../controllers/controller.js'),
	model = 'Produit',	
	Salle = require('../models/salles.js'),
	Produit = require('../models/produits.js');

//index listing of produit at :  /produits/
// AFFICHAGE OK. TODO VOIR POUR LES CLES ETRANGERES
exports.index = function(req, res){	
//	superController.index(req, res, model);


var p = [{
		"produitreference":1,
		"arrive": new Date('May 31, 2020 09:00:00'),
		"depart": new Date('Dec 28, 2020 18:00:00'),
		"sallereference": 20,
		"promotionreference": 3,
		"prix": 1000,
		"etat": 1
	},
	{
		"produitreference":2,
		"arrive": new Date('Jan 31, 2020 09:00:00'),
		"depart": new Date('Mar 01, 2020 18:00:00'),
		"sallereference": 1,
		"promotionreference": 1,
		"prix": 600,
		"etat": 0
	},
	{
		"produitreference":3,
		"arrive": new Date('May 31, 2020 09:00:00'),
		"depart": new Date('Dec 28, 2020 18:00:00'),
		"sallereference": 14,
		"promotionreference": null,
		"prix": 500,
		"etat": 1
	},
	{
		"produitreference":4,
		"arrive": new Date('Dec 30, 2012 09:00:00'),
		"depart": new Date('Dec 28, 2013 18:00:00'),
		"sallereference": 20,
		"promotionreference": 7,
		"prix": 500,
		"etat": 0
	},
	{
		"produitreference":5,
		"arrive": new Date('May 31, 2020 09:00:00'),
		"depart": new Date('Dec 08, 2020 18:00:00'),
		"sallereference": 18,
		"promotionreference": null,
		"prix": 1000,
		"etat": 1
	},
	{
		"produitreference":6,
		"arrive": new Date('May 31, 2012 09:00:00'),
		"depart": new Date('Dec 01, 2012 18:00:00'),
		"sallereference": 20,
		"promotionreference": null,
		"prix": 1000,
		"etat": 1
	},
	{
		"produitreference":7,
		"arrive": new Date('May 31, 2020 09:00:00'),
		"depart": new Date('Dec 28, 2020 18:00:00'),
		"sallereference": 2,
		"promotionreference": null,
		"prix": 1000,
		"etat": 1
	},
];


	Produit.findOne().populate('sallereference').exec(function(err, doc){
		console.log(doc);
	});/*
	Produit
	.find()
	.populate('sallereference', 20)
	.exec(function(err, pr){
		console.log(pr);		
	});*/

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