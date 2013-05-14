var Produit = require('../models/produits.js');

exports.reservation = function(req, res){
	Produit
		.find({'etat': 0})
		.populate('salle_id promotion_id')
		.exec(function(err, docs) {
		if(err) {
			throw err;
		} else if( (docs) && (docs.length) ) {
			res.render('reservation', { title: 'Réservation', docs: docs});
		} else {
			res.render('reservation', { title: 'Réservation', docs: null});
		}
	});
}

exports.ajouter_panier =  function(req, res){
		
		var panier_obj = {};
		var exists = false;

		if (!req.session.panier) {
			req.session.panier = [];
			req.session.panier_count = 0;
		}

		panier_obj.produit_id = req.body._id;
		panier_obj.produit_title = req.body.title;
		panier_obj.arrive = req.body.arrive;
		panier_obj.depart = req.body.depart;
		panier_obj.prix = req.body.prix;

		panier_obj.promotion_id = req.body.promotion_id._id;
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

		if (req.session.panier.length > 0) {
			for (i in req.session.panier){
				if (req.session.panier[i].produit_id == req.body._id) {
					exists = true;
				} 
			}
		}

		if (exists) {
			res.send({response: 'non', message: 'Ce produit est déjà dans le panier.'});
		} else {
			req.session.panier.push(panier_obj);
			req.session.panier_count++;
			res.send({response: 'ok', message: 'Le produit a été ajouté au panier.', count: req.session.panier_count});
		}
	}

exports.retirer_panier = function(req, res) {
	if (req.session.panier && req.session.panier.length > 0) {
		for (i in req.session.panier) {
			if (req.session.panier[i].produit_id == req.params.id) {
				delete req.session.panier[i];
				if (req.session.panier_count != 0) {
					req.session.panier_count--;
				}
				res.send({response: 'ok', message: 'Le produit a bien été retiré du panier.', count: req.session.panier_count});
			} else {
				res.send({response: 'non', message: 'Il n\'y a pas de tel produit dans le panier.', count: req.session.panier_count});
			}
		}
	} else {
		res.send({response: 'error', message: 'Une erreur s\'est produit, merci de réessayer plus tard.'});
	}
}

exports.vider_panier = function (req, res) {
	delete req.session.panier;
	res.send({response: 'Ok'});
}
