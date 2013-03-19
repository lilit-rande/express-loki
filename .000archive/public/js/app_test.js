var mongoose =require('mongoose');
var Schema = mongoose.Schema;
var Salle = require('./models/salles.js'),
	Produit = require('./models/produits.js'),
	Promotion = require('./models/promotions.js'),
	Membre = require('./models/membres.js'),
	Commentaire = require('./models/commentaire.js'),
	Commande = require('./models/commandes.js');
	
mongoose.connect('mongodb://localhost/lokisalle');

mongoose.connection.on('open', function(err){
	if (err) { 
		throw err;		
	} else {
		console.log('Connected to Mongoose');
	}
});

var
salle10 = new Salle({
		"title" : "Salle Cezanne", 
		"pays" : "France", 
		"ville" : "Lyon", 
		"adresse" : "10 rue Adresse", 
		"cp" : 69, 
		"capacite" : 30,
		"categorie" : "réunion",
		"description" : "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi",
		"image" : "vignette_ph_10.jpg"
	});

	
var 
	membre2 = new Membre ({
		'pseudo' : 'membre',
		'mdp':'membre',
		'nom':'MembreNom',
		'prenom':'MembrePrenom',
		'email':'membre@yahoo.fr',
		'sexe':'m',
		'ville':'Paris',
		'cp':'75011',
		'adresse':'244 bd Voltaire',
		'statut':'membre',
	});
	
/******************************/	
	salle10.save(function(err){	
		membre2.save(function(err){
			var commentaire2 = new Commentaire({				
				'comment':'magnifique',
				'note':5,
				'date':new Date('July 31, 2012 09:00:00'),
				'membre_id': membre2._id,
				'salle_id' : salle10._id
			});//commentaire2
			
			commentaire2.save(function(err){
				if (err) console.log(err);
				Commentaire
					.findOne({'_id': commentaire2._id})
					.populate('salle_id')
					.exec(function(err, commentaire){
						if(err) return handleError(err);
						console.log(commentaire.salle_id.title);
						salle10.commentaire.push(commentaire);
						salle10.save();
						
						membre2.commentaire.push(commentaire);
						membre2.save();
					});
			});	
			
			var produit5 = new Produit({
				"arrive": new Date('May 31, 2020 09:00:00'),
				"depart": new Date('Dec 28, 2020 18:00:00'),
				"prix": 500,
				"etat": 1,
				"salle_id": salle10._id
			});//produit5
			
			produit5.save(function(err){
				if (err) console.log(err);
				Produit
					.findOne({'_id': produit5._id})
					.populate('salle_id')
					.exec(function(err, produit){
						if(err) return handleError(err);
						console.log(produit.salle_id.title);
						salle10.produits.push(produit);
						salle10.save();
					});
commandes
----------
c-ref:	C0003
c-id:	512de218c3b526f5a6000021
p-id:	512de218c3b526f5a600001f


c-ref:	C0001
c-id:	512de218c3b526f5a6000027
p-id:	512de218c3b526f5a6000023


c-ref:	C0002
c-id:	512de218c3b526f5a600002b
p-id:	512de218c3b526f5a6000024

produits
--------		
c-id:	512de218c3b526f5a6000027
p-id:	512de218c3b526f5a6000023

c-id:	512de218c3b526f5a600002b
p-id:	512de218c3b526f5a6000024

		
				var commande1 = new Commande({
					'ref' : 'C0001',
					'montant':'1000',
					'date':new Date('July 31, 2012 09:00:00'),
					'membre_id':membre2._id,
					'produit_id':produit5._id
				});
				
				commande1.save(function(err){
					if (err) console.log(err);
					Commande
						.findOne({'_id': commande1._id})
						.populate('membre_id')
						.exec(function(err, commande){
							if(err) return handleError(err);						
							membre2.commandes.push(commande);
							membre2.save();
							
							produit5.commandes.push(commande);
							produit5.save();
						});				
				});
			});	//produit5
			
			var commande2 = new Commande({
				'ref' : 'C0002',
				'montant':'650',
				'date':new Date('July 31, 2012 09:00:00'),
				'membre_id':membre2._id
			});
			
			commande2.save(function(err){
				if (err) console.log(err);
				Commande
					.findOne({'_id': commande2._id})
					.populate('membre_id')
					.exec(function(err, commande){
						if(err) return handleError(err);						
						membre2.commandes.push(commande);
						membre2.save();
					});				
			});
			
		});//membre2
	});//salle10