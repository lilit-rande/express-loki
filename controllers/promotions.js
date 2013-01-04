//The promotions controller
var superController = require('../controllers/controller.js'),
	model = 'Promotion';

//index listing of promos at :  /promotions/
exports.index = function(req, res){	
	superController.index(req, res, model);
}

//display new promo form
exports.new = function(req, res) {	
	superController.new(req, res, model);
}

//add a promotion
exports.create = function(req, res) {
	var promotion = {
		code: req.body.promotioncode,
		reduction: req.body.promotionreduction
	};
	
	superController.create(req, res, model, promotion);
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
	var promotion = {
		code: req.body.promotioncode,
		reduction: req.body.promotionreduction
	};

	superController.update(req, res, model, promotion);
};

//show a promotion
exports.show = function(req, res) {
	superController.show(req, res, model);
}