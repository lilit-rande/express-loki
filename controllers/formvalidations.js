var Membre = require('../models/membres.js');
var Promocode = require('../models/promotions.js');


exports.pseudo =  function(req, res) {
	var pseudo = req.body.fieldName;
	
	Membre.count({'pseudo': pseudo}, function(err, count){
		if (err) {
			res.send(JSON.stringify({response:'error', msg: err}));
		} else {
			if(count) {
				res.send(JSON.stringify({response: true, msg: 'Ce pseudo existe déjà.'}));
			} else {
				res.send(JSON.stringify({response: false, msg: 'Ce pseudo est libre.'}));
			}
		}
	});
}

exports.email = function(req, res) {
	var email = req.body.fieldName;
	
	Membre.count({'email': email}, function(err, count){
		if (err) {
			res.send(JSON.stringify({response:'error', msg: err}));
		} else {
			if(count) {
				res.send(JSON.stringify({response: true, msg: 'Cet email existe déjà.'}));
			} else {
				res.send(JSON.stringify({response: false, msg: 'Cet email est libre.'}));
			}
		}
	});
};

exports.promocode = function(req, res) {
	var promocode = req.body.fieldName;
	
	Promocode.count({'code': promocode}, function(err, count){
		if (err) {
			res.send(JSON.stringify({response:'error', msg: err}));
		} else {
			if(count) {
				res.send(JSON.stringify({response: true, msg: 'Ce code promo existe déjà.'}));
			} else {
				res.send(JSON.stringify({response: false, msg: 'Cet code promo est libre.'}));
			}
		}
	});
};