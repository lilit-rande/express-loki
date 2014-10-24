var app = app || {};

app.ProduitView = Backbone.View.extend({
    tagName: 'tr',
    className: 'produit-ligne',
    template: _.template( $('#produitTemplate').html() ),

    render: function() {
        console.log( this.template );
        //this.el is what we defined in tagName. use $el to get access to jQuery html() function
        this.$el.html( this.template( this.model.attributes ) );

        return this;
    }
});