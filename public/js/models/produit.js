var app = app || {};

app.Produit = Backbone.Model.extend({
	defaults: {
		title: "Produit",
		arrive: "01/01/1970",
		depart: "01/01/1970",
		salle_id: "0",
		promotion_id: "0",
		prix: "null",
		etat: 1
	}
});