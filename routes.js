exports.routes = function(app) {
	
	// Middleware for limited access
	function requireLogin (req, res, next) {
	/*
		if (req.session.pseudo) {
			// User is authenticated, let him in
			next();
		} else {
			res.redirect('/membres/new/');
		}
		
		*/
	}
	
	
	
	var prefixes = ['salles','promotions','produits','avis','membres'];
	
	//map route to controller
	prefixes.forEach(function(prefix) {
		mapRoute(app, prefix);
	});
	
	
	
	

		
	// mapping route and controller for models
	function mapRoute(app, prefix) {
		prefix = '/' + prefix;
	//	'/salles/new'
		var prefixObj = require('./controllers' + prefix);
		
		//index
		app.get(prefix, prefixObj.index);
		
		//add
		app.get(prefix + '/new', prefixObj.new);
		
		//create
		app.post(prefix + '/create', prefixObj.create);
		
		//edit
		app.get(prefix + '/edit/:id', [requireLogin], prefixObj.edit);
		
		//edit
	//	app.get(prefix + '/delete/:id', prefixObj.delete);
		
		//update
		app.post(prefix +'/:id', [requireLogin], prefixObj.update);
		
		//destroy
		app.post(prefix + '/destroy/:id', [requireLogin], prefixObj.destroy);
		
		//show
		app.get(prefix + '/:id', [requireLogin], prefixObj.show);		
	};
	
	app.get('/', function(){
	/*
		Salle = require('models/salles.js');
		var query = Salle.find(null);
		query.limit(3);
		query.exec(function(err, docs) {
			if (err) {
				throw err;
			} else {
				res.render('index', {
					title: 'Accueil', salles : docs
				});
			}		
		});
		*/
	});
	
		
	app.post('/pseudo', function(req, res) {
		
		var Membre = require('./models/membres.js'),
			pseudo = req.body.pseudo;
		
		Membre.count({'pseudo': pseudo}, function(err, count){
			if (err) {
				res.send(JSON.stringify({response:'error', msg: err}));
			} else {
				if(count) {
					res.send(JSON.stringify({response: true, msg: 'Ce pseudo existe déjà.'}));
				} else {
					res.send(JSON.stringify({response: false, msg: 'Ce pseudo est libre.'}));
				}
			}
		});
		
		
		
	});
	
	app.get('/inscription/*', function(req, res) {
		if (!req.session.pseudo) {
			res.render('inscription', {title: 'Inscription', pseudo: req.session.pseudo});
		} else {
			res.redirect('/profil/');
		}
	});

		
	app.get('/connexion/*', function(req, res){
		res.render('connexion', {
			title: 'Connexion'
		});
	});

	app.post('/connexion', function(req, res){
		res.render('connexion', {
			title: 'Connexion'
		});
	});

	app.get('/deconnexion/*', [requireLogin], function(req, res){
		res.render('deconnexion', {
			title: 'Déconnexion'
		});
	});
	
	app.get('/profil/*', [requireLogin], function(req, res){
		res.render('profil', {
			title: 'Votre profile', pseudo: req.session.pseudo
		});
		
	});
	


	/*
	// Login form
	app.get('/login/*', function(req, res){
		res.render('login', {title: 'Connexion', pseudo: req.session.pseudo, error : null});
	});
	*/
	/*
	app.post('/login/*', function (req, res){
		var options = {pseudo: req.session.pseudo, error : null};
		
		if (!req.body.pseudo) {
			options.error = 'User name is required';
			res.render('login', options);
		} else if (req.body.pseudo == req.session.pseudo) {
			// User has not changed pseudo, accept it as-is
			res.redirect("/profil");
		} else if (!req.body.pseudo.match(/^[a-zA-Z0-9\-_]{3,}$/)){
			options.error = "User name must have at least 3 alphanumeric characters";
			res.render("login", options);
		} else {
			// Validate if pseudo is free
			if (pseudoIsAlreadyUsed) {
				options.error = "User name is already used by someone else";
				res.render("login", options);
			} else {
				req.session.pseudo = req.body.pseudo;
				res.redirect('/profil/');
			}
		}
	});
	*/
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
	


};