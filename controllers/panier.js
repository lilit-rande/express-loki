var Produit = require('../models/produits.js');
var Session = require('../models/session.js');

exports.index = function(req, res) {
	res.render('panier', {title: 'Mon panier'});


}

exports.ajouter_panier =  function(req, res){
		
		var panier_obj = {};
		var exists = false;
		var sId = '';

		if (!req.session.panier || req.session.panier[0] == null) {
			req.session.panier = [];
			req.session.panier_count = 0;
		}
		
		panier_obj.produit_id = req.body._id;
		panier_obj.produit_title = req.body.title;
		panier_obj.arrive = req.body.arrive;
		panier_obj.depart = req.body.depart;
		panier_obj.prix = req.body.prix;

		panier_obj.promotion_id = (req.body.promotion_id) ? req.body.promotion_id._id : '';
		panier_obj.promotion_code = (req.body.promotion_id) ? req.body.promotion_id.code : '';
		panier_obj.promotion_reduction = (req.body.promotion_id) ? req.body.promotion_id.reduction : 0;

		panier_obj.salle_id = req.body.salle_id._id;
		panier_obj.salle_title = req.body.salle_id.title;
		panier_obj.salle_adresse= req.body.salle_id.adresse;
		panier_obj.salle_capacite = req.body.salle_id.capacite;
		panier_obj.salle_categorie = req.body.salle_id.categorie;
		panier_obj.salle_cp = req.body.salle_id.cp;
		panier_obj.salle_image = req.body.salle_id.image;
		panier_obj.salle_pays = req.body.salle_id.pays;
		panier_obj.salle_ville = req.body.salle_id.ville;
	
		req.session.panier.push(panier_obj);
		req.session.panier_count++;

		if (req.cookies.sId) {
			sId = req.cookies.sId;
		} else {
			sId = req.sessionId;
		}

		var session_object = {
			sId: sId,
			panier: req.session.panier,
			count: req.session.panier_count
		};

		Session
		.findOne({'sId': sId})
		.exec(function(err, data){
			if (data == null){
				var s_obj = new Session(session_object);
				s_obj.save(function(err, save_data){
					if (err) {
						console.log(err);
						res.send({response: 'error', message: err, count: req.session.panier_count});
					} else {
						res.send({response: 'ok', message: 'Le produit a été ajouté au panier.', count: req.session.panier_count});
					}
				});
			} else {
				Session.update({'sId': sId}, session_object, function(err, update_data) {
					if(err) {
						console.log(err);
						res.send({response: 'error', message: err, count: req.session.panier_count});
					} else {
						res.send({response: 'ok', message: 'Le produit a été ajouté au panier.', count: req.session.panier_count});
					}
				});
			}
		});
	}

exports.retirer_panier = function(req, res) {
	
	var id = req.params.id;
	var sId = '';

	if (req.session.panier && req.session.panier.length > 0 && req.session.panier != null) {
	
		for(var i = 0; i<req.session.panier.length; i++) {
			if ( req.session.panier[i].produit_id == id) {
				req.session.panier.splice(i,1);

				if (req.session.panier_count != 0) {
					req.session.panier_count--;
				}
			}
		}

		if (req.cookies.sId) {
			sId = req.cookies.sId;
		} else {
			sId = req.sessionId;
		}

		var session_object = {
			sId: sId,
			panier: req.session.panier,
			count: req.session.panier_count
		};

		Session
		.findOne({'sId' : sId})
		.exec(function(err, data){
			if (data == null){
				var s_obj = new Session(session_object);
				s_obj.save(function(err, save_data){
					if (err) {
						res.send({response: 'error', message: 'Une erreur s\'est produit, merci de réessayer plus tard.', count: req.session.panier_count});
					} else {
						res.send({response: 'ok', message: 'Le produit a été retiré du panier.', count: req.session.panier_count});
					}
				});
			} else {
				Session.update({'sId': sId}, session_object, function(err, update_data) {
					if(err) {
						res.send({response: 'error', message: 'Une erreur s\'est produit, merci de réessayer plus tard.', count: req.session.panier_count});
					} else {
						res.send({response: 'ok', message: 'Le produit a été retiré du panier.', count: req.session.panier_count});
					}
				});
			}
		});
	}
}

exports.vider_panier = function (req, res) {
	req.session.panier = [];
	req.session.panier_count = 0;
	var sId = req.cookies.sId;

	Session
	.findOne({'sId': sId})
	.exec(function(err, data){
		if (data != null) {
			Session
			.remove({'sId': sId})
			.exec(function(err, doc){
				if(err) {
					res.send({response: 'error', message: 'Une erreur s\'est produit, merci de réessayer plus tard.', count: req.session.panier_count});
				} else {
					res.send({response: 'Ok', message: 'Votre panier a bien été vidé.'});
				}
			});
		}
	});

	console.log("SESSION PANIER = " + req.session.panier);
	console.log("COUNT = " + req.session.panier_count);
}
