var mongoose =require('mongoose');
var Schema = mongoose.Schema;
var Salle = require('./models/salles.js'),
	Produit = require('./models/produits.js'),
	Promotion = require('./models/promotions.js'),
	Membre = require('./models/membres.js'),
	Avis = require('./models/avis.js'),
	Commande = require('./models/commandes.js');
	
mongoose.connect('mongodb://localhost/lokisalle');

mongoose.connection.on('open', function(err){
	if (err) { 
		throw err;		
	} else {
		console.log('Connected to Mongoose');
	}
});

var salle20 = new Salle({  
			"title" : "Salle Langlois", 
			"pays" : "France",
			"ville" : "Paris",
			"adresse" : "10 rue Adresse",
			"cp" : 75754, 
			"capacite" : 50, 
			"categorie" : "réunion", 
			"description" : "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi", 
			"image" : "vignette_ph_20.jpg"
		}),
salle19 = new Salle({ 
		"title" : "Salle Grimaud", 
		"pays" : "France", 
		"ville" : "Lyon", 
		"adresse" : "10 rue Adresse", 
		"cp" : 69, 
		"capacite" : 60, 
		"categorie" : "réunion", 
		"description" : "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi", 
		"image" : "vignette_ph_19.jpg"
	}),
salle18 = new Salle({ 
		"title" : "Salle Jouvenet", 
		"pays" : "France", 
		"ville" : "Lyon", 
		"adresse" : "10 rue Adresse", 
		"cp" : 75, 
		"capacite" : 30, 
		"categorie" : "réunion", 
		"description" : "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi", 
		"image" : "vignette_ph_18.jpg"
	}),
salle17 = new Salle({ 
		"title" : "Salle Latour", 
		"pays" : "France", 
		"ville" : "Lyon", 
		"adresse" : "10 rue Adresse", 
		"cp" : 69, 
		"capacite" : 20, 
		"categorie" : "réunion", 
		"description" : "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi", 
		"image" : "vignette_ph_17.jpg"
	}),
salle16 = new Salle({ 
		"title" : "Salle Demanche", 
		"pays" : "France", 
		"ville" : "Marseille", 
		"adresse" : "10 rue Adresse", 
		"cp" : 13, 
		"capacite" : 20, 
		"categorie" : "réunion", 
		"description" : "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi", 
		"image" : "vignette_ph_16.jpg"
	}),
salle15 = new Salle({
		"title" : "Salle Delaroche", 
		"pays" : "France", 
		"ville" : "Paris", 
		"adresse" : "10 rue Adresse", 
		"cp" : 75, 
		"capacite" : 20, 
		"categorie" : "réunion", 
		"description" : "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi", 
		"image" : "vignette_ph_15.jpg"
	}),
salle14 = new Salle({
		"title" : "Salle Delacoix", 
		"pays" : "France", 
		"ville" : "Lyon", 
		"adresse" : "10 rue Adresse", 
		"cp" : 69, 
		"capacite" : 20, 
		"categorie" : "réunion", 
		"description" : "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi", 
		"image" : "vignette_ph_14.jpg"
	}),
salle13 = new Salle({
		"title" : "Salle Daubigny", 
		"pays" : "France", 
		"ville" : "Paris", 
		"adresse" : "10 rue Adresse", 
		"cp" : 75, 
		"capacite" : 30, 
		"categorie" : "réunion", 
		"description" : "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi", 
		"image" : "vignette_ph_13.jpg"
	}),
salle12 = new Salle({
		"title" : "Salle Couture", 
		"pays" : "France", 
		"ville" : "Marseille", 
		"adresse" : "10 rue Adresse", 
		"cp" : 13, 
		"capacite" : 20, 
		"categorie" : "réunion", 
		"description" : "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi", 
		"image" : "vignette_ph_12.jpg"
	}),
salle11 = new Salle({
		"title" : "Salle Clesinger", 
		"pays" : "France", 
		"ville" : "Paris", 
		"adresse" : "10 rue Adresse", 
		"cp" : 75754, 
		"capacite" : 45, 
		"categorie" : "réunion", 
		"description" : "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi", 
		"image" : "vignette_ph_11.jpg"
	}),
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
	}),
salle9 = new Salle({
		"title" : "Salle Carriere",
		"pays" : "France",
		"ville" : "Marseille",
		"adresse" : "10 rue Adresse",
		"cp" : 13,
		"capacite" : 10,
		"categorie" : "réunion",
		"description" : "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi",
		"image" : "vignette_ph_9.jpg"
	}),
salle8 = new Salle({
		"title" : "Salle Cabat",
		"pays" : "France",
		"ville" : "Paris",
		"adresse" : "10 rue Adresse",
		"cp" : 75,
		"capacite" : 25,
		"categorie" : "réunion",
		"description" : "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi",
		"image" : "vignette_ph_8.jpg"
	}),
salle7 = new Salle({
		"title" : "Salle Ballerat",
		"pays" : "France", 
		"ville" : "Lyon", 
		"adresse" : "10 rue Adresse", 
		"cp" : 69,
		"capacite" : 30,
		"categorie" : "réunion",
		"description" : "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi",
		"image" : "vignette_ph_7.jpg" 
	}),
salle6 = new Salle({
		"title" : "Salle Victoire", 
		"pays" : "France",
		"ville" : "Marseille",
		"adresse" : "10 rue Adresse",
		"cp" : 13,
		"capacite" : 30,
		"categorie" : "réunion",
		"description" : "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi",
		"image" : "vignette_ph_6.jpg"
	}),
salle5 = new Salle({
		"title" : "Salle Ballerat Paris",
		"pays" : "France",
		"ville" : "Paris",
		"adresse" : "10 rue Adresse",
		"cp" : 75,
		"capacite" : 50,
		"categorie" : "réunion",
		"description" : "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi",
		"image" : "vignette_ph_5.jpg"
	}),
salle4 = new Salle({
		"title" : "Salle Balle",
		"pays" : "France",
		"ville" : "Paris",
		"adresse" : "10 rue Adresse",
		"cp" : 75754,
		"capacite" : 80,
		"categorie" : "réunion",
		"description" : "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi",
		"image" : "vignette_ph_4.jpg"
	}),
salle3 = new Salle({
		"title" : "Salle Bardin",
		"pays" : "France",
		"ville" : "Paris",
		"adresse" : "10 rue Adresse",
		"cp" : 75,
		"capacite" : 20,
		"categorie" : "réunion",
		"description" : "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi",
		"image" : "vignette_ph_3.jpg"
	}),
salle2 = new Salle({
		"title" : "Salle Baron",
		"pays" : "France",
		"ville" : "Paris",
		"adresse" : "10 rue Adresse",
		"cp" : 75,
		"capacite" : 70,
		"categorie" : "réunion",
		"description" : "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi",
		"image" : "vignette_ph_2.jpg"
	}),
salle1 = new Salle({
		"title" : "Salle Duval",
		"pays" : "France",
		"ville" : "Paris",
		"adresse" : "10 rue Adresse",
		"cp" : 75,
		"capacite" : 50,
		"categorie" : "réunion",
		"description" : "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi",
		"image" : "vignette_ph_1.jpg"
	});
	
var	promotion1 = new Promotion({
		"code":"AF689H",
		"reduction":"80",
		}),
	promotion2 = new Promotion({
		"code":"DG567M",
		"reduction":"90"
	}),
	promotion3 = new Promotion({
		"code":"ZE098T",
		"reduction":"20"
	}),
	promotion4 = new Promotion({
		"code":"HJ456Y",
		"reduction":"50"
	}),
	promotion5 = new Promotion({
		"code":"KL214J",
		"reduction":"60"
	}),
	promotion6 = new Promotion({
		"code":"MP705L",
		"reduction":"20"
	}),
	promotion7 = new Promotion({
		"code":"AF689H",
		"reduction":"80"
	});
	
var membre1 = new Membre ({
		'pseudo' : 'admin',
		'mdp':'admin',
		'nom':'Lilit',
		'prenom':'Randé',
		'email':'liluxm@yahoo.fr',
		'sexe':'f',
		'ville':'Paris',
		'cp':'75011',
		'adresse':'244 bd Voltaire',
		'statut':'admin',
	}),
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
	}),
	membre3 = new Membre ({
		'pseudo' : 'test',
		'mdp':'test',
		'nom':'David',
		'prenom':'Jean-Louis',
		'email':'test@yahoo.fr',
		'sexe':'m',
		'ville':'Paris',
		'cp':'75011',
		'adresse':'244 bd Voltaire',
		'statut':'membre',
	});
	
	
	salle20.save(function(err){
		promotion3.save(function(err){
			promotion7.save(function(err){
				var produit1 = new Produit({
						"arrive": new Date('May 31, 2020 09:00:00'),
						"depart": new Date('Dec 28, 2020 18:00:00'),
						"prix": 1000,
						"etat": 1,
						"salle_id": salle20._id,
						"promotion_id": promotion3._id
					});//produit1
					
				produit1.save(function(err){
					if (err) console.log(err);
					Produit
						.findOne({'_id': produit1._id})
						.populate('salle_id')
						.exec(function(err, produit){
							if(err) return handleError(err);
							console.log(produit.salle_id.title);
							salle20.produits.push(produit);
							salle20.save();
														
							promotion3.produits.push(produit);
							promotion3.save();							
						});
				});
				var produit4 = new Produit({						
						"arrive": new Date('Dec 30, 2012 09:00:00'),
						"depart": new Date('Dec 28, 2013 18:00:00'),
						"prix": 500,
						"etat": 0,						
						"salle_id": salle20._id,
						"promotion_id": promotion7._id
					});//produit4
					
				produit4.save(function(err){
					if (err) console.log(err);
					Produit
						.findOne({'_id': produit4._id})
						.populate('salle_id')
						.exec(function(err, produit){
							if(err) return handleError(err);
							console.log(produit.salle_id.title);
							salle20.produits.push(produit);
							salle20.save();
														
							promotion7.produits.push(produit);
							promotion7.save();
						});
				});
				
				var produit6 = new Produit({
						"arrive": new Date('May 31, 2012 09:00:00'),
						"depart": new Date('Dec 01, 2012 18:00:00'),
						"prix": 1000,
						"etat": 1,						
						"salle_id": salle20._id
					});//produit6
					
				produit6.save(function(err){
					if (err) console.log(err);
					Produit
						.findOne({'_id': produit6._id})
						.populate('salle_id')
						.exec(function(err, produit){
							if(err) return handleError(err);
							console.log(produit.salle_id.title);
							salle20.produits.push(produit);
							salle20.save();
						});
				});
				
			});	//promotion7
		});	//promotion3
	});//salle20
	
	
	salle19.save(function(err){
		if (err) console.log(err);
	});

	salle18.save(function(err){
		var produit5 = new Produit({
					"arrive": new Date('May 31, 2020 09:00:00'),
					"depart": new Date('Dec 08, 2020 18:00:00'),
					"prix": 1000,
					"etat": 1,
					"salle_id": salle18._id
				});//produit5
				
			produit5.save(function(err){
				if (err) console.log(err);
				Produit
					.findOne({'_id': produit5._id})
					.populate('salle_id')
					.exec(function(err, produit){
						if(err) return handleError(err);
						console.log(produit.salle_id.title);
						salle18.produits.push(produit);
						salle18.save();
					});
			});
	});//salle18
	
			
	salle17.save(function(err){
		if (err) console.log(err);
	});
	
	salle16.save(function(err){
		if (err) console.log(err);
	});
	
	salle15.save(function(err){
		if (err) console.log(err);
	});
	
	salle14.save(function(err){
		var produit5 = new Produit({
					"arrive": new Date('May 31, 2020 09:00:00'),
					"depart": new Date('Dec 28, 2020 18:00:00'),
					"prix": 500,
					"etat": 1,
					"salle_id": salle14._id
				});//produit5
				
			produit5.save(function(err){
				if (err) console.log(err);
				Produit
					.findOne({'_id': produit5._id})
					.populate('salle_id')
					.exec(function(err, produit){
						if(err) return handleError(err);
						console.log(produit.salle_id.title);
						salle14.produits.push(produit);
						salle14.save();
					});
			});
	});//salle14
	
		
	salle13.save(function(err){
		if (err) console.log(err);
	});
	
	salle12.save(function(err){
		if (err) console.log(err);
	});
	
	salle11.save(function(err){
		if (err) console.log(err);
	});
	
	salle10.save(function(err){		
		membre2.save(function(err){
			var avis2 = new Avis({				
				'comment':'magnifique',
				'note':5,
				'date':new Date('July 31, 2012 09:00:00'),
				'membre_id': membre2._id,
				'salle_id' : salle10._id
			});//avis2
			
			avis2.save(function(err){
				if (err) console.log(err);
				Avis
					.findOne({'_id': avis2._id})
					.populate('salle_id')
					.exec(function(err, avis){
						if(err) return handleError(err);
						console.log(avis.salle_id.title);
						salle10.avis.push(avis);
						salle10.save();
						
						membre2.avis.push(avis);
						membre2.save();
					});				
			});	
		
			var commande1 = new Commande({
				'ref' : 'C0001',
				'montant':'1000',
				'membre_id':membre2._id
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
					});				
			});
			
			var commande2 = new Commande({
				'ref' : 'C0002',
				'montant':'650',
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

		
	salle9.save(function(err){
		if (err) console.log(err);
	});		
	salle8.save(function(err){
		if (err) console.log(err);
	});		
	salle7.save(function(err){
		if (err) console.log(err);
	});		
	salle6.save(function(err){
		if (err) console.log(err);
	});		
	salle5.save(function(err){
		if (err) console.log(err);
	});		
	salle4.save(function(err){
		if (err) console.log(err);
	});		
	salle3.save(function(err){
		if (err) console.log(err);
	});	
	salle2.save(function(err){
		var produit2 = new Produit({
				"arrive": new Date('May 31, 2020 09:00:00'),
				"depart": new Date('Dec 28, 2020 18:00:00'),
				"prix": 1000,
				"etat": 1,
				"salle_id": salle2._id,
			});//produit1
			
		produit2.save(function(err){
			if (err) console.log(err);
			Produit
				.findOne({'_id': produit2._id})
				.populate('salle_id')
				.exec(function(err, produit){
					if(err) return handleError(err);
					salle2.produits.push(produit);
					salle2.save();
				});
		});	
		
		membre3.save(function(err){
			var avis2 = new Avis({				
				'comment':'Tout ce que j\'attendais. Merci',
				'note':4,
				'date':new Date('January 31, 2012 09:00:00'),
				'membre_id': membre3._id,
				'salle_id' : salle2._id
			});//avis2
			
			avis2.save(function(err){
				if (err) console.log(err);
				Avis
					.findOne({'_id': avis2._id})
					.populate('salle_id')
					.exec(function(err, avis){
						if(err) return handleError(err);
						console.log(avis.salle_id.title);
						salle2.avis.push(avis);
						salle2.save();
						
						membre3.avis.push(avis);
						membre3.save();
					});				
			});
			
			var commande3 = new Commande({
				'ref' : 'C0003',
				'montant':'1350',
				'membre_id':membre3._id
			});
			
			commande3.save(function(err){
				if (err) console.log(err);
				Commande
					.findOne({'_id': commande3._id})
					.populate('membre_id')
					.exec(function(err, commande){
						if(err) return handleError(err);						
						membre3.commandes.push(commande);
						membre3.save();
					});				
			});
			
		});//membre3
	});//salle2
	salle1.save(function(err){
		promotion1.save(function(err){
			var produit2 = new Produit({
					"arrive": new Date('Jan 31, 2020 09:00:00'),
					"depart": new Date('Mar 01, 2020 18:00:00'),
					"prix": 600,
					"etat": 0,
					"salle_id": salle1._id,
					"promotion_id": promotion1._id
				});//produit1
				
			produit2.save(function(err){
				if (err) console.log(err);
				Produit
					.findOne({'_id': produit2._id})
					.populate('salle_id')
					.exec(function(err, produit){
						if(err) return handleError(err);
						console.log(produit.salle_id.title);
						salle1.produits.push(produit);
						salle1.save();
														
						promotion1.produits.push(produit);
						promotion1.save();
					});
			});	
		});	//promotion1
		
		membre1.save(function(err){
			var avis1 = new Avis({				
				'comment':'Superbes lieux, idéal pour une conférence au projecteur',
				'note':5,
				'date':new Date('May 31, 2012 09:00:00'),
				'membre_id': membre1._id,
				'salle_id' : salle1._id
			});//avis1
			
			avis1.save(function(err){
				if (err) console.log(err);
				Avis
					.findOne({'_id': avis1._id})
					.populate('salle_id')
					.exec(function(err, avis){
						if(err) return handleError(err);
						console.log(avis.salle_id.title);
						salle1.avis.push(avis);
						salle1.save();
						
						membre1.avis.push(avis);
						membre1.save();
					});				
			});
		});//membre1
	});//salle1
			
	promotion2.save(function(err){
		if (err) console.log(err);
	});		
	promotion4.save(function(err){
		if (err) console.log(err);
	});		
	promotion5.save(function(err){
		if (err) console.log(err);
	});		
	promotion6.save(function(err){
		if (err) console.log(err);
	});	

	/*
	Produit
		.findOne({})
		.populate('salle_title','Salle Langlois')
		.exec(function(err, produit){
			if(err) return handleError(err);
			console.log(produit.salle_id.title);
			salle20.produits.push(produit);
			
		});*/