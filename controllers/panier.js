var Produit = require('../models/produits.js');
var Panier = require('../models/panier.js');
var maxAge = 1000*60*60*24*30*3;

exports.index = function(req, res) {
	res.render('panier', {title: 'Mon panier'});


}

exports.ajouter_panier =  function(req, res){
		
		var panier_obj = {};


		var exists = false;

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

	//	panier_obj.date_creation = Date.now();
		


			req.session.panier.push(panier_obj);
			req.session.panier_count++;

//		 	res.cookie('panier', { obj : req.session.panier, count : req.session.panier_count }, { maxAge: 1000*60*60*24*30*3 });

		 	console.log("SESSION PANIER = " + req.session.panier + "COUNT PANIER = " + req.session.panier_count);
			res.send({response: 'ok', message: 'Le produit a été ajouté au panier.', count: req.session.panier_count});
	}

exports.retirer_panier = function(req, res) {
	if (req.session.panier && req.session.panier.length > 0 && req.session.panier != null) {
		for (var i=0; i<req.session.panier.length; i++) {
		//	if(req.session.panier[i] != null) {		

			console.log('ID = ****** = ' + req.params.id);
			console.log('SESSION.PANIER[i] = ******** = ' + req.session.panier[i]);

			console.log('SESSION.PANIER[i].produit_id = ******** = ' + req.session.panier[i].produit_id);
				if (req.session.panier[i].produit_id == req.params.id) {
					
					req.session.panier.splice(i,1);

					if (req.session.panier_count != 0) {
						req.session.panier_count--;
					
					} 
					var obj = req.session.panier;
					var count = req.session.panier_count;

//					res.cookie('panier', { obj : obj, count : count }, { maxAge: 1000*60*60*24*30*3 });
					console.log("SESSION PANIER = " + req.session.panier + "COUNT PANIER = " + req.session.panier_count);
					res.send({response: 'ok', message: 'Le produit a bien été retiré du panier.', count: req.session.panier_count});
				} else {
					res.send({response: 'non', message: 'Il n\'y a pas de tel produit dans le panier.', count: req.session.panier_count});
				}
	//		}
		}
	} else {
		res.send({response: 'error', message: 'Une erreur s\'est produit, merci de réessayer plus tard.'});
	}
}

exports.vider_panier = function (req, res) {
	
	req.session.panier = [];
//	res.clearCookie('panier');

	console.log("SESSION PANIER = " + req.session);
	res.send({response: 'Ok', message: 'Votre panier a bien été vidé.'});
}
