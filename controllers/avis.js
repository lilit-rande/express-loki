//The avis controller
var superController = require('../controllers/controller.js'),
	model = 'Avis';

//index listing of promos at :  /avis/
exports.index = function(req, res){	
	superController.index(req, res, model);
}

//display new promo form
exports.new = function(req, res) {	
	superController.new(req, res, model);
}

//add a promotion
exports.create = function(req, res) {
	var avis = {
			date: req.body.avisdate,
			salle_id: req.body.new_salle_id,
			membre_id: req.body.membre_id,
			note: req.body.avisnote,
			comment: req.body.aviscomment
		};
	
	superController.create(req, res, model, avis);
};

//display delete form
exports.delete = function(req, res) {
	superController.delete(req, res, model);
};

//delete a promotion
exports.destroy = function(req, res) {
	superController.destroy(req, res, model);
};


//display edit form
exports.edit = function(req, res) {
	imagePath = '';
	superController.edit(req, res, model, imagePath);	
};

//update a promotion
exports.update = function(req, res) {
	var avis = {
			date: req.body.avisdate,
			salle_id: req.body.new_salle_id,
			salle_id: req.body.membre_id,
			note: req.body.avisnote,
			comment: req.body.aviscomment
		},
		foreignModels = ['Salle', 'Membre'];
	
	superController.update(req, res, model, avis, foreignModels);
};

//show a promotion
exports.show = function(req, res) {
	superController.show(req, res, model);
}

