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
		"image" : "vignette_ph_20.jpg",
		"produits": [{
						"arrive": new Date('May 31, 2020 09:00:00'),
						"depart": new Date('Dec 28, 2020 18:00:00'),
						"prix": 1000,
						"etat": 1
					},
					{
						"arrive": new Date('Dec 30, 2012 09:00:00'),
						"depart": new Date('Dec 28, 2013 18:00:00'),
						"prix": 500,
						"etat": 0
					},
					{
						"arrive": new Date('May 31, 2012 09:00:00'),
						"depart": new Date('Dec 01, 2012 18:00:00'),
						"prix": 1000,
						"etat": 1
					}]

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
		"image" : "vignette_ph_19.jpg",
		"produits": []
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
		"image" : "vignette_ph_18.jpg",
		"produits": [{
						"arrive": new Date('May 31, 2020 09:00:00'),
						"depart": new Date('Dec 08, 2020 18:00:00'),
						"prix": 1000,
						"etat": 1
					}]
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
		"image" : "vignette_ph_17.jpg",
		"produits": []
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
		"image" : "vignette_ph_16.jpg",
		"produits": []
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
		"image" : "vignette_ph_15.jpg",
		"produits": []
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
		"image" : "vignette_ph_14.jpg",
		"produits": [{
						"arrive": new Date('May 31, 2020 09:00:00'),
						"depart": new Date('Dec 28, 2020 18:00:00'),
						"prix": 500,
						"etat": 1
					}]
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
		"image" : "vignette_ph_13.jpg",
		"produits": []
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
		"image" : "vignette_ph_12.jpg",
		"produits": []
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
		"image" : "vignette_ph_11.jpg",
		"produits": []
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
		"image" : "vignette_ph_10.jpg",
		"produits": []
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
		"image" : "vignette_ph_9.jpg",
		"produits": []
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
		"image" : "vignette_ph_8.jpg",
		"produits": [] 
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
		"image" : "vignette_ph_7.jpg",
		"produits": [] 
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
		"image" : "vignette_ph_6.jpg",
		"produits": []
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
		"image" : "vignette_ph_5.jpg",
		"produits": []
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
		"image" : "vignette_ph_4.jpg",
		"produits": []
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
		"image" : "vignette_ph_3.jpg",
		"produits": []
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
		"image" : "vignette_ph_2.jpg",
		"produits": [{
						"arrive": new Date('May 31, 2020 09:00:00'),
						"depart": new Date('Dec 28, 2020 18:00:00'),
						"prix": 1000,
						"etat": 1
					}]
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
		"image" : "vignette_ph_1.jpg",
		"produits": [{
						"arrive": new Date('Jan 31, 2020 09:00:00'),
						"depart": new Date('Mar 01, 2020 18:00:00'),
						"prix": 600,
						"etat": 0
					}]
	}];

db.salles.save(s);
db.salles.find();

db.salles.drop();

p = [,
	,

	{
		"arrive": new Date('Dec 30, 2012 09:00:00'),
		"depart": new Date('Dec 28, 2013 18:00:00'),
		"salle_id": 20,
		"promotion_id": 7,
		"prix": 500,
		"etat": 0
	},

,
];
/*************	PROMOTIONS	********************/
db.promotions.drop();
db.createCollection("promotions");
p = [{
		"code":"AF689H",
		"reduction":"80",
		"produits": [{
						"arrive": new Date('Jan 31, 2020 09:00:00'),
						"depart": new Date('Mar 01, 2020 18:00:00'),
						"prix": 600,
						"etat": 0
					}]
	},
	{
		"code":"DG567M",
		"reduction":"90",
		"produits": []
	},
	{
		"code":"TK623R",
		"reduction":"40",
		"produits": [{
						"arrive": new Date('May 31, 2020 09:00:00'),
						"depart": new Date('Dec 28, 2020 18:00:00'),
						"prix": 1000,
						"etat": 1
					}]
	},
	{
		"code":"ZE098T",
		"reduction":"20",
		"produits": []
	},
	{
		"code":"HJ456Y",
		"reduction":"50",
		"produits": []
	},
	{
		"code":"KL214J",
		"reduction":"60",
		"produits": []
	},
	{
		"code":"MP705L",
		"reduction":"20",
		"produits": [{
						"arrive": new Date('May 31, 2020 09:00:00'),
						"depart": new Date('Dec 28, 2020 18:00:00'),
						"prix": 1000,
						"etat": 1
					}]
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






db.membres.save(m);