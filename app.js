/**
 * Module dependencies.
 */
var express = require('express'),
	route = require('./routes'),
	http = require('http'),
	mongoose = require('mongoose'),
	Deferred = require ('JQDeferred'),
	fs = require('fs'),
	Validations = require('validations');

const port = process.env.PORT || 3000;

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
  this.set('views', __dirname + '/views');
  this.set('view engine', 'jade');
});

/*
Les sessions avec Express fonctionnent de manière habituelle: 
	un ID de session est affecté à un visiteur et stocké dans un cookie. 
	Côté serveur, on stocke des données dans un « store » variable (mémoire, fichiers, base de données…) affectées à cet ID, avec un petit garbage collector qui va bien. 
	Rien de d'étonnant, néanmoins comme par défaut il n’y a aucun parsing des headers de la requête HTTP, il faut tout de même prévoir quelques opérations ne serait-ce que pour savoir lire le cookie.
	
	On va donc utiliser deux « middlewares »: un pour parser les cookies, un autre pour gérer les sessions: express.cookieParser et express.session
*/
app.configure(function(){
	// Allow parsing form data
	this.use(express.bodyParser({uploadDir:'./uploads'}));
  
	// Allow parsing cookies from request headers
	this.use(express.cookieParser());
  
	// Session management
	this.use(express.session({ 
			// Grâce à ça chaque requête est enrichie d’un objet « session » qu’on peut manipuler. 
		  	// Private crypting key
		  	'secret' : 'your secret here',
		  	
		  	// Internal session data storage engine, this is the default engine embedded with connect.
		    // Much more can be found as external modules (Redis, Mongo, Mysql, file...). look at "npm search connect session store"
		    'store' : new express.session.MemoryStore({ reapInterval : 60000 * 10})
		})
	);
	
	this.use(express.methodOverride());
	this.use(app.router);
	this.use(require('stylus').middleware({ src: __dirname + '/public' }));
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





