/*
* GET home page. 
*/
var mongoose = require('mongoose');
var Salle = require('../models/salles.js');

exports.index = function(req, res){
	var query = Salle.find(null);
	query.limit(3);
	query.exec(function(err, docs) {
		if (err) {
			throw err;
		} else {
			res.render('index', {
				title: 'Accueil', salles : docs
			});
		}		
	});
}