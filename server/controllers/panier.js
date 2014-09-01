var Produit = require('../models/produits.js');
var Session = require('../models/session.js');

exports.index = function(req, res) {
	var panier_objects = req.session.panier;
	var count = req.session.panier_count;
	res.render('panier', {title: 'Mon panier', panier_datas : req.session.panier, panier_count: req.session.panier_count});
}

function saveCart( _sId, session_object, res, _message ) {
	Session
	.findOne({'sId': _sId})
	.exec(function(err, data){
		if (data == null){
			var s_obj = new Session(session_object);
			s_obj.save(function(err, save_data){
				if (err) {
					console.log(err);
					res.send({response: 'error', message: err, count: session_object.count});
				} else {
					res.send({response: 'ok', message: _message, count: session_object.count});
				}
			});
		} else {
			Session.update({'sId': _sId}, session_object, function(err, update_data) {
				if(err) {
					console.log(err);
					res.send({response: 'error', message: err, count: session_object.count});
				} else {
					res.send({response: 'ok', message: _message, count: session_object.count});
				}
			});
		}
	});
}

exports.ajouter_panier =  function(req, res){
		
	var exists = false;
	var sId = '';

	if (!req.session.panier || req.session.panier[0] == null) {
		req.session.panier = [];
		req.session.panier_count = 0;
	}

	
	var panier_obj = {
		"produit_id" : req.body._id,
		"produit_title" : req.body.title,
		"arrive" : req.body.arrive,
		"depart" : req.body.depart,
		"prix" : req.body.prix,
		"promotion_id" : (req.body.promotion_id) ? req.body.promotion_id._id : '',
		"promotion_code" : (req.body.promotion_id) ? req.body.promotion_id.code : '',
		"promotion_reduction" : (req.body.promotion_id) ? req.body.promotion_id.reduction : 0,
		"salle_id" : req.body.salle_id._id,
		"salle_title" : req.body.salle_id.title,
		"salle_adresse" :req.body.salle_id.adresse,
		"salle_capacite" : req.body.salle_id.capacite,
		"salle_categorie" : req.body.salle_id.categorie,
		"salle_cp" : req.body.salle_id.cp,
		"salle_image" : req.body.salle_id.image,
		"salle_pays" : req.body.salle_id.pays,
		"salle_ville" : req.body.salle_id.ville
	};

	if (req.cookies.sId) {
		sId = req.cookies.sId;
	} else {
		sId = req.sessionId;
	}
	req.session.panier.push(panier_obj);
	req.session.panier_count++;

	var session_object = {
		sId: sId,
		panier: req.session.panier,
		count: req.session.panier_count
	};

	saveCart(sId, session_object, res, 'Le produit a été ajouté au panier.');
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
		saveCart( sId, session_object, res, 'Le produit a été retiré du panier.' );
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
					res.send({response: 'ok', message: 'Votre panier a bien été vidé.'});
				}
			});
		}
	});
}
