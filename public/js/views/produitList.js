var app = app || {};

app.ProduitListView = Backbone.View.extend({
	el: '#produit-list',

	initialize: function( initialProduits ) {
		this.collection = new app.ProduitList( initialProduits);
		this.render();
	},

	render: function() {
		this.collection.each(function( item ){
			this.renderProduit( item );
		}, this);
	},

	renderProduit: function(item) {
		var produitView = new app.ProduitView({
			model: item
		});
		this.$el.append( produitView.render().el );
	}
});