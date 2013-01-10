
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
	fs = require('fs');
// var	form = require('connect-form');

mongoose.connect('mongodb://localhost/lokisalle');

mongoose.connection.on('open', function(err){
	if (err) { 
		throw err;		
	} else {
		console.log('Connected to Mongoose');
	}
});

var mongoose =require('mongoose');
var Schema = mongoose.Schema;

var promotionSchema = new Schema({
	code: {type: String, require:true, trim:true, unique:true },
	reduction: {type: Number, require: true, trim:true},
	produits : [{type: Schema.Types.ObjectId, ref:'Produit'}]
});

var salleSchema = new Schema({
	title: {type: String, require: true, trim: true},
	adresse: {type: String, require: true, trim: true},
	ville: {type: String, require: true, trim: true},
	cp: {type: Number, require: true, trim: true},
	pays: {type: String, require: true, trim: true},
	capacite: Number,
	categorie: {type: String, require: true, trim: true},
	image: String,
	description: String,
	produits : [{type: Schema.Types.ObjectId, ref:'Produit'}]
});

var produitSchema = new Schema({
	arrive: {type: Date, require: true, trim: true},
	depart: {type: Date, require: true, trim: true},
	salle_id: {type: Schema.Types.ObjectId, ref: 'Salles'},	
	promotion_id: {type: Schema.Types.ObjectId, ref: 'Promotions'},
	prix: {type: Number, require: true, trim: true},
	etat: {type: Number, require: true, trim: true},
});

var Salle = mongoose.model('Salles', salleSchema),
	Produit = mongoose.model('Produits', produitSchema),
	Promotion = mongoose.model('Promotions', promotionSchema);
	
var salle = new Salle({  
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
	promotion = new Promotion({
		"code":"AF689H",
		"reduction":"80"
	});

	salle.save(function(err){
		promotion.save(function(err){			
			var produit = new Produit({
					"arrive": new Date('May 31, 2020 09:00:00'),
					"depart": new Date('Dec 28, 2020 18:00:00'),
					"prix": 1000,
					"etat": 1,
					"salle_id": salle._id,
					"promotion_id": promotion._id
				});
			
			produit.save(function(err){
				if (err) return handleError(err);
			});
		});
	});
	
	Produit
		.findOne({})
		.populate('salle_id')
		.exec(function(err, produit){
			if(err) return handleError(err);
			console.log(produit.salle_id.title);
			salle.produits.push(produit);
			salle.save();
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
var prefixes = ['salles','promotions', 'produits'];

//map route to controller
prefixes.forEach(function(prefix) {
	map.mapRoute(app, prefix);
});

app.get('/reservation/*', function(req, res){
	//res.send(req.params);
	res.render('reservation', {
		title: 'Réservation'
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
