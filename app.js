
//test
/**
 * Module dependencies.
 */
var express = require('express'),
	routes = require('./routes'),
	map = require('./controllers/maproutecontroller'),
	http = require('http'),
	mongoose = require('mongoose'),
	Deferred = require ('JQDeferred'),
	fs = require('fs'),
	Validations = require('validations');

//	model = 'Produit';
// var	form = require('connect-form');

mongoose.connect('mongodb://localhost/lokisalle');

mongoose.connection.on('open', function(err){
	if (err) { 
		throw err;		
	} else {
		console.log('Connected to Mongoose');
	}
});

	
var app = module.exports = express();
//var app = module.exports = express.createServer(form({ keepExtensions: true, uploadDir:'./uploads' }));

// Configuration
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser({uploadDir:'./uploads'}));
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'your secret here' }));
  app.use(require('stylus').middleware({ src: __dirname + '/public' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
  app.use(function(req, res, next){
	  throw new Error(req.url + ' not found');
  });
  app.use(function(err, req, res, next){
  	console.log(err);
  	res.send(err.message);
  });
});

app.configure('development', function(){
	app.use(express.errorHandler({ 
		dumpExceptions: true, showStack: true 
	})); 
});

app.configure('production', function(){
	app.use(express.errorHandler()); 
});

// Routes
app.get('/', routes.index);
var prefixes = ['salles','promotions','produits','avis','membres'];

//map route to controller
prefixes.forEach(function(prefix) {
	map.mapRoute(app, prefix);
});

app.get('/reservation/*', function(req, res){
	//res.send(req.params);
	Produit = require('./models/produits.js');
	Produit
		.find({'etat': 1})
		.populate('salle_id')
		.populate('promotion_id')
		.exec(function(err, docs) {
		if(err) {
			throw err;
		} else if( (docs) && (docs.length) ) {
			res.render('reservation', { title: 'Réservation', docs: docs});
			console.log(docs);
		} else {
			res.render('reservation', { title: 'Réservation', docs: null});
		}
	});
});

/*
app.get("/products/:id/:operation?", function(req,res) { 
	console.log(req);
	res.send(req.params.operation + ' ' + req.params.id); 
});
*/

// Get method
/*
app.get('/location', function(req, res) {
  var id = ObjectID.createFromHexString(req.body.id);
  db.collection('locations', function(err, collection) {

    collection.findOne({_id:id}, function(err, item) {

      // Fetch all docs for rendering of list
      collection.find({}).toArray(function(err, items) {            
        res.render('./basic.jade', {locals: {locations:items, location:item}});
      })            
    })
  });
});
*/

app.get('/recherche/*', function(req, res){
	res.render('recherche', {
		title: 'Recherche'
	});
});

app.get('/inscription/*', function(req, res){
	res.render('inscription', {
		title: 'Inscription'
	});
});

app.get('/profil/*', function(req, res){
	res.render('profil', {
		title: 'Votre profil'
	});
});

//routes footer
app.get('/mentions/*', function(req, res){
	res.render('mentions', {
		title: 'Mentions légales'
	});
});

app.get('/cgv/*', function(req, res){
	res.render('cgv', {
		title: 'Conditions générales de vente'
	});
});

app.get('/plan/*', function(req, res){
	res.render('plan', {
		title: 'Plan du site'
	});
});

app.get('/inscription-newsletter/*', function(req, res){
	res.render('inscription-newsletter', {
		title: 'Inscription à la newsletter'
	});
}); 

app.get('/contact/*', function(req, res){
	res.render('contact', {
		title: 'Contact'
	});
}); 


//mongoose.connection.close();
app.listen(3000);
//http.createServer(app).listen(3000);
console.log("Express server listening on port %d in %s mode", app.adress, app.settings.env);
