/**
 * Module dependencies.
 */
var express = require('express'),
	route = require('./routes'),
	http = require('http'),
	url = require('url'),
	mongoose = require('mongoose'),
	Deferred = require ('JQDeferred'),
	fs = require('fs'),
	Validations = require('validations');

const port = process.env.PORT || 3000;

//connection
mongoose.connect('mongodb://localhost/lokisalle');

mongoose.connection.on('open', function(err){
	if (err) { 
		throw err;		
	} else {
		console.log('Connected to Mongoose');
	}
});

// var	Schema = mongoose.Schema;

// var Any = new Schema({
// 	any: Schema.Types.Mixed
// 	// code: {type: String, require:true, trim:true, index: {sparse: true, unique:true}  },
// 	// reduction: {type: Number, require: true, trim:true},
// 	// produits : [{type: Schema.Types.ObjectId, ref:'Produits', default: null, require: false}]
// });

// var Person = mongoose.model('Any', Any);
// var person = new Person;

// person.any = { x: [3, 4, { y: "changed" }] };
// person.markModified('any');
// person.save(function(err, data){
// 	if (err) {
// 		console.log(err)
// 	} else {
// 		console.log(data);
// 	}
// }); // anything will now get saved
// person.any = { x: [3, 4, { y: "changed", z:'changed' }] };

// person.save(function(err, data){
// 	if (err) {
// 		console.log(err)
// 	} else {
// 		console.log(data);
// 	}
// }); // anything will now get saved

var app = module.exports = express();

//var app = module.exports = express.createServer(form({ keepExtensions: true, uploadDir:'./uploads' }));

// Configuration
/*
Les sessions avec Express fonctionnent de manière habituelle: 
	un ID de session est affecté à un visiteur et stocké dans un cookie. 
	Côté serveur, on stock des données dans un « store » variable (mémoire, fichiers, base de données…) affectées à cet ID, avec un petit garbage collector qui va bien. 
	Rien de d'étonnant, néanmoins comme par défaut il n’y a aucun parsing des headers de la requête HTTP, 
	il faut tout de même prévoir quelques opérations ne serait-ce que pour savoir lire le cookie.
	
	On va donc utiliser deux « middlewares »: un pour parser les cookies, un autre pour gérer les sessions: express.cookieParser et express.session
*/
app.configure(function(){
	this.set('views', __dirname + '/views');
	this.set('view engine', 'jade');
	
	// Allow parsing json, x-www-form-urlencoded and multipart/form-data
	this.use(express.bodyParser({uploadDir:'./uploads'}));

	this.use(express.methodOverride());

	// Allow parsing cookies from request headers		
	this.use(express.cookieParser('PNquG656yQc4'));  
  
	// Session management
	this.use(express.session({ 
			// Grâce à ça chaque requête est enrichie d’un objet « session » qu’on peut manipuler. 
		  	// Private crypting key
		  	'secret' : 'PNquG656yQc4',
		  	// Internal session data storage engine, this is the default engine embedded with connect.
		    // Much more can be found as external modules (Redis, Mongo, Mysql, file...). look at "npm search connect session store"
		    'store' : new express.session.MemoryStore({ reapInterval : 60000 * 10})
		})
	);

	// save the user pseudo on locals for use in jade templates
	// in express 3.x the res.locals replaces the app.dynamicHelpers of express 2.x
	this.use(function(req, res, next){
		res.locals.session = req.session;
		var maxAge = 1000*60*60*24*30*3 ;
		var Session = require('./models/session.js');

		if ( ! req.cookies.sId ) {
			res.cookie('sId', req.sessionID, { maxAge: maxAge });
		//	res.cookie('panier', { obj: [], count: 0 }, { maxAge: maxAge });
		} else {
			Session
			.findOne({'sId': req.cookies.sId})
			.exec(function(err, data){
				if(data != null) {
					req.session.panier = data.panier;
					req.session.panier_count = data.count;
				}
			});
		}
		res.locals.cookies = req.cookies;
		next();
	});

	
	this.use(app.router);
	
	this.use(express.static(__dirname + '/public'));
	this.use(function(req, res, next){
	  throw new Error(req.url + ' not found');
	});
	this.use(function(err, req, res, next){
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
route.routes(app);

//mongoose.connection.close();
app.listen(port);
//http.createServer(app).listen(3000);
console.log("Express server listening on port %d in %s mode", port, app.settings.env);





