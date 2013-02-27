//The promotions controller
var superController = require('../controllers/controller.js'),
	model = 'Produit',	
	Salle = require('../models/salles.js'),
	Produits = require('../models/produits.js'),
	Promotion = require('../models/promotions.js');

//index listing of produit at :  /produits/
exports.index = function(req, res){	
	superController.index(req, res, model);
}

//display new promo form
exports.new = function(req, res) {	
	superController.new(req, res, model);
}


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

//display edit form
exports.edit = function(req, res) {
	imagePath = '';
	superController.edit(req, res, model, imagePath);
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
		foreignModels = ['Salle', 'Promotion'];
	superController.update(req, res, model, produit, foreignModels);
};

//show a produit
exports.show = function(req, res) {
	superController.show(req, res, model);
}

//add a produit
exports.create = function(req, res) {
		
	var produit = {
		title: req.body.produittitle,
		arrive: req.body.produitarrive,
		depart: req.body.produitdepart,
		salle_id: req.body.new_salle_id,	
		promotion_id: (req.body.new_promotion_id) ? req.body.new_promotion_id : null,
		prix: req.body.produitprix,
		etat: req.body.produitetat,
	};
	superController.create(req, res, model, produit);
};






































