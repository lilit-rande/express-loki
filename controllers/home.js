var Produit = require('../models/produits.js');

exports.index = function(req, res){
	Produit
		.find({'etat': 0})
		.populate('salle_id promotion_id')
		.limit(3)
		.exec(function(err, docs) {
		if(err) {
			throw err;
		} else if( (docs) && (docs.length) ) {
			res.render('index', { title: 'Accueil', docs: docs});
		} else {
			res.render('index', { title: 'Accueil', docs: null});
		}
	});
}
