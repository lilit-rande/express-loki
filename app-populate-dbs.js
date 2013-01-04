mongo localhost/lokisalle;
db.getCollectionNames();


/*************	SALLES	********************/
db.createCollection("salles");
s = [{ 
		"sallereference" : 1, 
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
		"sallereference" : 2, 
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
		"sallereference" :3, 
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
		"sallereference" : 4, 
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
		"sallereference" : 5, 
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
		"sallereference" : 6, 
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
		"sallereference" : 7, 
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
		"sallereference" : 8, 
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
		"sallereference" : 9, 
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
		"sallereference" : 10, 
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
		"sallereference" : 11, 
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
		"sallereference" : 12,
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
		"sallereference" : 13,
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
		"sallereference" : 14,
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
		"sallereference" :15, 
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
		"sallereference" : 16,
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
		"sallereference" : 17,
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
		"sallereference" : 18,
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
		"sallereference" : 19,
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
		"sallereference" : 20,
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
		"promotionreference":1,
		"code":"AF689H",
		"reduction":"80"
	},
	{
		"promotionreference":2,
		"code":"DG567M",
		"reduction":"90"
	},
	{
		"promotionreference":3,
		"code":"TK623R",
		"reduction":"40"
	},
	{
		"promotionreference":4,
		"code":"ZE098T",
		"reduction":"20"
	},
	{
		"promotionreference":5,
		"code":"HJ456Y",
		"reduction":"50"
	},
	{
		"promotionreference":6,
		"code":"KL214J",
		"reduction":"60"
	},
	{
		"promotionreference":7,
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
		"produitreference":1,
		"arrive": new Date('May 31, 2020 09:00:00'),
		"depart": new Date('Dec 28, 2020 18:00:00'),
		"sallereference": 20,
		"promotionreference": 3,
		"prix": 1000,
		"etat": 1
	},
	{
		"produitreference":2,
		"arrive": new Date('Jan 31, 2020 09:00:00'),
		"depart": new Date('Mar 01, 2020 18:00:00'),
		"sallereference": 1,
		"promotionreference": 1,
		"prix": 600,
		"etat": 0
	},
	{
		"produitreference":3,
		"arrive": new Date('May 31, 2020 09:00:00'),
		"depart": new Date('Dec 28, 2020 18:00:00'),
		"sallereference": 14,
		"promotionreference": null,
		"prix": 500,
		"etat": 1
	},
	{
		"produitreference":4,
		"arrive": new Date('Dec 30, 2012 09:00:00'),
		"depart": new Date('Dec 28, 2013 18:00:00'),
		"sallereference": 20,
		"promotionreference": 7,
		"prix": 500,
		"etat": 0
	},
	{
		"produitreference":5,
		"arrive": new Date('May 31, 2020 09:00:00'),
		"depart": new Date('Dec 08, 2020 18:00:00'),
		"sallereference": 18,
		"promotionreference": null,
		"prix": 1000,
		"etat": 1
	},
	{
		"produitreference":6,
		"arrive": new Date('May 31, 2012 09:00:00'),
		"depart": new Date('Dec 01, 2012 18:00:00'),
		"sallereference": 20,
		"promotionreference": null,
		"prix": 1000,
		"etat": 1
	},
	{
		"produitreference":7,
		"arrive": new Date('May 31, 2020 09:00:00'),
		"depart": new Date('Dec 28, 2020 18:00:00'),
		"sallereference": 2,
		"promotionreference": null,
		"prix": 1000,
		"etat": 1
	},
];

db.produits.save(p);






db.membres.save(m);
