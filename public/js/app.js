var app = app || {};

$(function() {
	var produits = [
		{ "_id": "1", "title": "Produit1", "arrive": new Date('May 31, 2020 09:00:00'), "depart": new Date('Dec 28, 2020 18:00:00'), "prix": 1000, "etat": 1, "salle_id": 20, "promotion_id": 3 },
		{ "_id": "2", "title": "Produit2", "arrive": new Date('May 31, 2020 09:00:00'), "depart": new Date('Dec 28, 2020 18:00:00'), "prix": 1000, "etat": 0, "salle_id": 1, "promotion_id": 4 },
		{ "_id": "3", "title": "Produit3", "arrive": new Date('May 31, 2020 09:00:00'), "depart": new Date('Dec 28, 2020 18:00:00'), "prix": 1000, "etat": 1, "salle_id": 2, "promotion_id": 5 }
	];

	new app.ProduitListView( produits );
});