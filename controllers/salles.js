//The salles controller
var superController = require('../controllers/controller.js'),
	model = 'Salle';
		
//index listing of salles at :  /salles/
exports.index = function(req, res){
	superController.index(req, res, model);
}

//display new salle form
exports.new = function(req, res) {	
	superController.new(req, res, model);
}

//add a salle
exports.create = function(req, res) {
	var salle = {
		title: req.body.salletitle,
		adresse: req.body.salleadresse,
		ville: req.body.salleville,
		cp: req.body.sallecp,
		pays: req.body.sallepays,
		capacite: req.body.sallecapacite,
		categorie: req.body.sallecategorie,
		image: req.body.salleimagevisible,
		description: req.body.salledescription
	};
	
	superController.create(req, res, model, salle);
};

//display delete form
exports.delete = function(req, res) {
	superController.delete(req, res, model);
};

//delete a salle
exports.destroy = function(req, res) {
	superController.destroy(req, res, model);
};

//display edit form
exports.edit = function(req, res) {
	var imagePath = '../../images/vignettes/';
	superController.edit(req, res, model, imagePath);	
};

//update a salle
exports.update = function(req, res) {
	var salle = {
		title: req.body.salletitle,
		adresse: req.body.salleadresse,
		ville: req.body.salleville,
		cp: req.body.sallecp,
		pays: req.body.sallepays,
		capacite: req.body.sallecapacite,
		categorie: req.body.sallecategorie,
		image: req.body.salleimagevisible,
		description: req.body.salledescription
	};

	superController.update(req, res, model, salle);
};

//show a salle
exports.show = function(req, res) {
	superController.show(req, res, model);
}