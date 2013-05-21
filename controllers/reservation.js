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
