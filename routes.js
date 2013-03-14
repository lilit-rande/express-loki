exports.routes = function(app) {
	var formValidator = require('./controllers/formvalidations'),
		login = require('./controllers/login'),
		
		home = require('./controllers/home'),
		reservation = require('./controllers/reservation'),
		search = require('./controllers/search')
		
	// Middleware for limited access
	function requireLogin (req, res, next) {
		if (req.session.pseudo) {
			// User is authenticated, let him in
			next();
		} else {
			res.redirect('/');
		}
	}
	
	function adminOnly (req, res, next) {
		if (req.session.pseudo) {
			// User is authenticated
			var User = require('./models/membres.js'),
				pseudo = req.session.pseudo;
				
			User.find({pseudo: pseudo}, function(err, data){
				console.log(data);
				if (data[0].statut == 'admin') {
					// User is admin let him in
					next();
				} else {
					res.redirect('/');
				}
			});
		} else {
			res.redirect('/');
		}
	}
	
	app.get('/', home.index);
	
	var prefixes = ['salles','promotions','produits','avis','membres'];
	
	//map route to controller
	prefixes.forEach(function(prefix) {
		mapRoute(app, prefix);
	});
	
		


	// mapping route and controller for models
	/*
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
		app.get(prefix + '/edit/:id', prefixObj.edit);
		
		//edit
	//	app.get(prefix + '/delete/:id', prefixObj.delete);
		
		//update
		app.post(prefix +'/:id', prefixObj.update);
		
		//destroy
		app.post(prefix + '/destroy/:id', prefixObj.destroy);
		
		//show
		app.get(prefix + '/:id', prefixObj.show);		
	};
	*/


	
	// Routes avec require login
	function mapRoute(app, prefix) {
		prefix = '/' + prefix;
	//	'/salles/new'
		var prefixObj = require('./controllers' + prefix);
		
		//index
		app.get(prefix, [adminOnly], prefixObj.index);
		
		//add
		app.get(prefix + '/new', [adminOnly], prefixObj.new);
		
		//create
		app.post(prefix + '/create', [adminOnly], prefixObj.create);
		
		//edit
		app.get(prefix + '/edit/:id', [adminOnly], prefixObj.edit);
		
		//edit
	//	app.get(prefix + '/delete/:id', prefixObj.delete);
		
		//update
		app.post(prefix +'/:id', [adminOnly], prefixObj.update);
		
		//destroy
		app.post(prefix + '/destroy/:id', [adminOnly], prefixObj.destroy);
		console.log(prefix);
		//show
		app.get(prefix + '/:id', [adminOnly], prefixObj.show);		
	};

	
	

	
	//form validation routes
	app.post('/pseudo', formValidator.pseudo);
	app.post('/email', formValidator.email);
	
	// login / logout routes
	app.get('/inscription', login.inscription);
	app.get('/inscription/*', login.inscription);
	app.post('/login/create', login.create);
	
	app.get('/logout', [requireLogin], login.logout);
	app.get('/logout/*', [requireLogin], login.logout);
	
	app.post('/connexion/*', login.connect);
	app.post('/connexion', login.connect);

	app.get('/profil/:id', [requireLogin], login.profil);
	
	app.get('/reservation', reservation.reservation);
	app.get('/recherche', search.search);

	//routes footer
	app.get('/mentions', function(req, res){
		res.render('mentions', {title: 'Mentions légales'});
	});	
	app.get('/cgv', function(req, res){
		res.render('cgv', {title: 'Conditions générales de vente'});
	});	
	app.get('/plan', function(req, res){
		res.render('plan', {title: 'Plan du site'});
	});	
	app.get('/inscription-newsletter', function(req, res){
		res.render('inscription-newsletter', {title: 'Inscription à la newsletter'});
	}); 	
	app.get('/contact', function(req, res){
		res.render('contact', {title: 'Contact'});
	}); 
	


};