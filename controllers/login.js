var Membre = require('../models/membres.js');

exports.inscription = function(req, res){
	console.log(req.session.user_id);
	if (!req.session.user_id) {
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
			statut : '0'
	};
	modelObj = new Membre(membre);

	modelObj.save(function(err, data){
		if (err) {
			res.render('generals/error', {title: "Echec de création", body: "Une erreur s'est produit, merci de réessayer plus tard. Message : " + err.message});
		} else {
			req.session.pseudo = req.body.pseudo;
			req.session.user_id = data._id;
			req.session.statut = 0;
			res.redirect('profil/' + data._id);
		}
	});
};

exports.connect = function(req, res) {
console.log(req.body.pseudo);	
	var user = {
			pseudo: req.body.pseudo,
			mdp: req.body.mdp
		},
		url = 'profil/';
	
	Membre.findOne(user, function(err, data){
		if (err) {
			res.render('generals/error', {title: "Echec de création", body: "Une erreur s'est produit, merci de réessayer plus tard. Message : " + err.message});
		} else {
			if (data) {				
				req.session.user_id = data._id;
				req.session.pseudo = req.body.pseudo;
				req.session.statut = data.statut;
			
				if (req.session.currentPage) {
					url = req.session.currentPage;
				} else {				
					url += data._id;
				}
				res.redirect(url);
			} else {
				//TODO
				res.send({message: 'Pseudo ou mot de passe érronés.'});
			}
		}
	});
}

exports.profil = function(req, res) {			
	
	var ref,
		field,
		findObj = {};
	field = '_id';
	if (typeof(req.params.id) != 'undefined' && req.params.id !== null) {
		ref = req.params.id;		
	} else {
//		ref = 'admin';
		ref = req.session.user_id;
//		field = 'pseudo';
	}
	
	findObj[field] = ref;
	
	Membre
	.findOne(findObj)
	.populate('commentaires commandes')
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
	if (req.session.user_id) {
		req.session.destroy(function(){
		//	res.render('generals/logout', {title: 'A bientôt', body: 'Merci de votre visite.'});
			res.redirect('/');
		});
	}
}

