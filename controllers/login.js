var Membre = require('../models/membres.js');

exports.inscription = function(req, res){
	if (!req.session.pseudo) {
		res.render('inscription', {title: 'Inscription'});
	} else {
		res.redirect('/');
	}
}

//add a member
exports.create = function(req, res) {
	membre = { 
			pseudo : req.body.pseudo,
			mdp : req.body.mdp,
			email : req.body.email,
			nom : req.body.nom,
			prenom : req.body.prenom,
			sexe : req.body.sexe,	// 'f' ou 'm'
			ville : req.body.ville,
			cp : req.body.cp,
			adresse : req.body.adresse,
			statut : 'user'
	};
	modelObj = new Membre(membre);

	modelObj.save(function(err, data){
		if (err) {
			res.render('generals/error', {title: "Echec de création", body: "Une erreur s'est produit, merci de réessayer plus tard. Message : " + err.message});
		} else {
			req.session.pseudo = req.body.pseudo;
			console.log(req.session.currentPage);
			res.redirect('profil/' + data._id);
		}
	});
};

exports.connect = function(req, res) {
	var user = {
		pseudo: req.body.pseudo,
		mdp: req.body.mdp
	},
		url = 'profil/';
	
	Membre.find(user, 'pseudo mdp', function(err, data){
		if (err) {
			res.render('generals/error', {title: "Echec de création", body: "Une erreur s'est produit, merci de réessayer plus tard. Message : " + err.message});
		} else {
			if (data && data.length) {
				
				req.session.pseudo = req.body.pseudo;
				if (req.session.currentPage) {
					url = req.session.currentPage;
					res.redirect(url);
				} else {				
					res.redirect(url + data[0]._id);
				}
			} else {
				//TODO
				res.send({message: 'Pseudo ou mot de passe érronés.'});
			}
		}
	});
}

exports.profil = function(req, res) {			
	var ref = req.params.id;

	Membre.findOne({'_id': ref})
		.populate('commentaires')
		.populate('commandes')
		.exec(function(err, doc){	
		if(err) {
			throw err;
		} else {
			if (!doc) {
				res.render('profil', {id: ref, title:'Bonjour ' + doc.pseudo, data:doc});
			} else {
				res.render('profil', {title: 'Bonjour ' + doc.pseudo, data: doc});
			}
		}
	});

}
exports.logout = function(req, res) {
	console.log(req.session.pseudo);
	if (req.session.pseudo) {
		req.session.destroy(function(){
		//	res.render('generals/logout', {title: 'A bientôt', body: 'Merci de votre visite.'});
			res.redirect('/');
		});
	}
}

