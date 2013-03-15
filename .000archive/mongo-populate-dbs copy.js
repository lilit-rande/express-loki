mongo localhost/lokisalle;
db.getCollectionNames();


/*************	SALLES	********************/
db.createCollection("salles");
s = [{  
		"title" : "Salle Langlois", 
		"pays" : "France",
		"ville" : "Paris",
		"adresse" : "10 rue Adresse",
		"cp" : 75754, 
		"capacite" : 50, 
		"categorie" : "réunion", 
		"description" : "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi", 
		"image" : "vignette_ph_20.jpg"
	},
	{ 
		"title" : "Salle Grimaud", 
		"pays" : "France", 
		"ville" : "Lyon", 
		"adresse" : "10 rue Adresse", 
		"cp" : 69, 
		"capacite" : 60, 
		"categorie" : "réunion", 
		"description" : "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi", 
		"image" : "vignette_ph_19.jpg"
	},
	{ 
		"title" : "Salle Jouvenet", 
		"pays" : "France", 
		"ville" : "Lyon", 
		"adresse" : "10 rue Adresse", 
		"cp" : 75, 
		"capacite" : 30, 
		"categorie" : "réunion", 
		"description" : "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi", 
		"image" : "vignette_ph_18.jpg"
	},
	{ 
		"title" : "Salle Latour", 
		"pays" : "France", 
		"ville" : "Lyon", 
		"adresse" : "10 rue Adresse", 
		"cp" : 69, 
		"capacite" : 20, 
		"categorie" : "réunion", 
		"description" : "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi", 
		"image" : "vignette_ph_17.jpg"
	},
	{ 
		"title" : "Salle Demanche", 
		"pays" : "France", 
		"ville" : "Marseille", 
		"adresse" : "10 rue Adresse", 
		"cp" : 13, 
		"capacite" : 20, 
		"categorie" : "réunion", 
		"description" : "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi", 
		"image" : "vignette_ph_16.jpg"
	},
	{
		"title" : "Salle Delaroche", 
		"pays" : "France", 
		"ville" : "Paris", 
		"adresse" : "10 rue Adresse", 
		"cp" : 75, 
		"capacite" : 20, 
		"categorie" : "réunion", 
		"description" : "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi", 
		"image" : "vignette_ph_15.jpg"
	},
	{
		"title" : "Salle Delacoix", 
		"pays" : "France", 
		"ville" : "Lyon", 
		"adresse" : "10 rue Adresse", 
		"cp" : 69, 
		"capacite" : 20, 
		"categorie" : "réunion", 
		"description" : "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi", 
		"image" : "vignette_ph_14.jpg"
	},
	{
		"title" : "Salle Daubigny", 
		"pays" : "France", 
		"ville" : "Paris", 
		"adresse" : "10 rue Adresse", 
		"cp" : 75, 
		"capacite" : 30, 
		"categorie" : "réunion", 
		"description" : "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi", 
		"image" : "vignette_ph_13.jpg"
	},
	{
		"title" : "Salle Couture", 
		"pays" : "France", 
		"ville" : "Marseille", 
		"adresse" : "10 rue Adresse", 
		"cp" : 13, 
		"capacite" : 20, 
		"categorie" : "réunion", 
		"description" : "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi", 
		"image" : "vignette_ph_12.jpg"
	},
	{
		"title" : "Salle Clesinger", 
		"pays" : "France", 
		"ville" : "Paris", 
		"adresse" : "10 rue Adresse", 
		"cp" : 75754, 
		"capacite" : 45, 
		"categorie" : "réunion", 
		"description" : "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi", 
		"image" : "vignette_ph_11.jpg"
	},
	{
		"title" : "Salle Cezanne", 
		"pays" : "France", 
		"ville" : "Lyon", 
		"adresse" : "10 rue Adresse", 
		"cp" : 69, 
		"capacite" : 30,
		"categorie" : "réunion",
		"description" : "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi",
		"image" : "vignette_ph_10.jpg"
	},
	{
		"title" : "Salle Carriere",
		"pays" : "France",
		"ville" : "Marseille",
		"adresse" : "10 rue Adresse",
		"cp" : 13,
		"capacite" : 10,
		"categorie" : "réunion",
		"description" : "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi",
		"image" : "vignette_ph_9.jpg"
	},
	{
		"title" : "Salle Cabat",
		"pays" : "France",
		"ville" : "Paris",
		"adresse" : "10 rue Adresse",
		"cp" : 75,
		"capacite" : 25,
		"categorie" : "réunion",
		"description" : "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi",
		"image" : "vignette_ph_8.jpg"
	},
	{
		"title" : "Salle Ballerat",
		"pays" : "France", 
		"ville" : "Lyon", 
		"adresse" : "10 rue Adresse", 
		"cp" : 69,
		"capacite" : 30,
		"categorie" : "réunion",
		"description" : "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi",
		"image" : "vignette_ph_7.jpg" 
	},
	{
		"title" : "Salle Victoire", 
		"pays" : "France",
		"ville" : "Marseille",
		"adresse" : "10 rue Adresse",
		"cp" : 13,
		"capacite" : 30,
		"categorie" : "réunion",
		"description" : "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi",
		"image" : "vignette_ph_6.jpg"
	},
	{
		"title" : "Salle Ballerat Paris",
		"pays" : "France",
		"ville" : "Paris",
		"adresse" : "10 rue Adresse",
		"cp" : 75,
		"capacite" : 50,
		"categorie" : "réunion",
		"description" : "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi",
		"image" : "vignette_ph_5.jpg"
	},
	{
		"title" : "Salle Balle",
		"pays" : "France",
		"ville" : "Paris",
		"adresse" : "10 rue Adresse",
		"cp" : 75754,
		"capacite" : 80,
		"categorie" : "réunion",
		"description" : "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi",
		"image" : "vignette_ph_4.jpg"
	},
	{
		"title" : "Salle Bardin",
		"pays" : "France",
		"ville" : "Paris",
		"adresse" : "10 rue Adresse",
		"cp" : 75,
		"capacite" : 20,
		"categorie" : "réunion",
		"description" : "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi",
		"image" : "vignette_ph_3.jpg"
	},
	{
		"title" : "Salle Baron",
		"pays" : "France",
		"ville" : "Paris",
		"adresse" : "10 rue Adresse",
		"cp" : 75,
		"capacite" : 70,
		"categorie" : "réunion",
		"description" : "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi",
		"image" : "vignette_ph_2.jpg"
	},
	{
		"title" : "Salle Duval",
		"pays" : "France",
		"ville" : "Paris",
		"adresse" : "10 rue Adresse",
		"cp" : 75,
		"capacite" : 50,
		"categorie" : "réunion",
		"description" : "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi",
		"image" : "vignette_ph_1.jpg"
	}];

db.salles.save(s);
db.salles.find();

db.salles.drop();


/*************	PROMOTIONS	********************/
db.promotions.drop();
db.createCollection("promotions");
p = [{
		"code":"AF689H",
		"reduction":"80",
	{
		"code":"DG567M",
		"reduction":"90"
	},
	{
		"code":"TK623R",
		"reduction":"40"
	},
	{
		"code":"ZE098T",
		"reduction":"20"
	},
	{
		"code":"HJ456Y",
		"reduction":"50"
	},
	{
		"code":"KL214J",
		"reduction":"60"
	},
	{
		"code":"MP705L",
		"reduction":"20"
	}
];

db.promotions.save(p);

/*************	PRODUITS	********************/

//etat produit 
//				0 :	A Louer
//				1 : Loué
//				2 : Expiré
db.produits.drop();

db.createCollection("produits");
p = [{
		"arrive": new Date('May 31, 2020 09:00:00'),
		"depart": new Date('Dec 28, 2020 18:00:00'),
		"salle_id": 20,
		"promotion_id": 3,
		"prix": 1000,
		"etat": 1
	},
	{
		"arrive": new Date('Jan 31, 2020 09:00:00'),
		"depart": new Date('Mar 01, 2020 18:00:00'),
		"salle_id": 1,
		"promotion_id": 1,
		"prix": 600,
		"etat": 0
	},
	{
		"arrive": new Date('May 31, 2020 09:00:00'),
		"depart": new Date('Dec 28, 2020 18:00:00'),
		"salle_id": 14,
		"promotion_id": null,
		"prix": 500,
		"etat": 1
	},
	{
		"arrive": new Date('Dec 30, 2012 09:00:00'),
		"depart": new Date('Dec 28, 2013 18:00:00'),
		"salle_id": 20,
		"promotion_id": 7,
		"prix": 500,
		"etat": 0
	},
	{
		"arrive": new Date('May 31, 2020 09:00:00'),
		"depart": new Date('Dec 08, 2020 18:00:00'),
		"salle_id": 18,
		"promotion_id": null,
		"prix": 1000,
		"etat": 1
	},
	{
		"arrive": new Date('May 31, 2012 09:00:00'),
		"depart": new Date('Dec 01, 2012 18:00:00'),
		"salle_id": 20,
		"promotion_id": null,
		"prix": 1000,
		"etat": 1
	},
	{
		"arrive": new Date('May 31, 2020 09:00:00'),
		"depart": new Date('Dec 28, 2020 18:00:00'),
		"salle_id": 2,
		"promotion_id": null,
		"prix": 1000,
		"etat": 1
	},
];

db.produits.save(p);



/*************	MEMBRES	********************/
/*
	statut: admin			:1
			moderateur		:2
			membre			:3
			emailConfirm	:4
			guest			:5
*/

db.membres.drop();

db.createCollection("membres");
m = [{
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
	},
	{
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
	},
	{
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
	},
];

db.membres.save(m);
/*************	AVIS	********************/

db.avis.drop();

db.createCollection("avis");
a = [{
		'id_membre': 1,
		'id_salle' : 5,
		'commentaire':'Superbes lieux, idéal pour une conférence au projecteur',
		'note':5,
		'date':new Date('May 31, 2012 09:00:00')
	},
	{
		'id_membre': 2,
		'id_salle' : 10,
		'commentaire':'magnifique',
		'note':5,
		'date':new Date('July 31, 2012 09:00:00')
	},
	{
		'id_membre': 3,
		'id_salle' : 2,
		'commentaire':'Tout ce que j\'attendais. Merci':,
		'note':4,
		'date':new Date('January 31, 2012 09:00:00')
	},
];

db.avis.save(a);
/*************	COMMANDES	********************/
db.commandes.drop();

db.createCollection("commandes");
c = [{
		'ref' : 'C0001',
		'id_membre':'2',
		'montant':'1000'
	},
	{
		'ref' : 'C0002',
		'id_membre':'2',
		'montant':'650'
	},
	{
		'ref' : 'C0003',
		'id_membre':'3',
		'montant':'1350'
	},
];

db.commandes.save(c);


/*************	DROP DATABASES	********************/

db.produits.drop();
db.salles.drop();
db.promotions.drop();

db.avis.drop();
db.commandes.drop();
db.membres.drop();

