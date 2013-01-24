//The promotions controller
var superController = require('../controllers/controller.js'),
	model = 'Produit',	
	Salle = require('../models/salles.js'),
	Produits = require('../models/produits.js'),
	Promotion = require('../models/promotions.js');

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
};

//update a produit
exports.update = function(req, res) {
		
	produit = {
		arrive: req.body.produitarrive,
		depart: req.body.produitdepart,
		salle_id: req.body.salle_id,	
		promotion_id: (req.body.promotion_id)?req.body.promotion_id:null,
		prix: req.body.produitprix,
		etat: req.body.produitetat,
	};
	superController.update(req, res, model, produit);
};

//show a produit
exports.show = function(req, res) {
	superController.show(req, res, model);
}









































