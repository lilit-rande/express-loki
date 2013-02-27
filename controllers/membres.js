//The salles controller
var superController = require('../controllers/controller.js'),
	model = 'Membre',
	Membre  = require('../models/membres.js'),
	Avis = require('../models/avis.js'),
	Commandes = require('../models/commandes.js');
		
//index listing of members at :  /membres/
exports.index = function(req, res){
	superController.index(req, res, model);
}

//display new member form
exports.new = function(req, res) {	
	superController.new(req, res, model);
}

//add a member
exports.create = function(req, res) {
	var membre = {	
		pseudo: req.body.membrepseudo,
		mdp: req.body.membremdp,
		nom: req.body.membrenom,	
		prenom: req.body.membreprenom,
		email: req.body.membreemail,
		sexe: req.body.membresexe,
		ville: req.body.membreville,
		cp: req.body.membrecp,
		adresse: req.body.membreadresse,
		statut: req.body.membrestatut
	};
	
	superController.create(req, res, model, membre);
};

//display delete form
exports.delete = function(req, res) {
	superController.delete(req, res, model);
};

//delete a member
exports.destroy = function(req, res) {
	superController.destroy(req, res, model);
};

//display edit form
exports.edit = function(req, res) {
	var imagePath = '../../images/vignettes/';
	superController.edit(req, res, model, imagePath);	
};

//update a member
exports.update = function(req, res) {
	var membre = {	
		pseudo: req.body.membrepseudo,
		mdp: req.body.membremdp,
		nom: req.body.membrenom,	
		prenom: req.body.membreprenom,
		email: req.body.membreemail,
		sexe: req.body.membresexe,
		ville: req.body.membreville,
		cp: req.body.membrecp,
		adresse: req.body.membreadresse,
		statut: req.body.membrestatut
	},
	foreignModels = ['Avis', 'Commandes'];
	
	superController.update(req, res, model, membre, foreignModels);
};

//show member info
exports.show = function(req, res) {
	superController.show(req, res, model);

}





















































