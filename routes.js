exports.routes = function(app) {
	var formValidator = require('./controllers/formvalidations'),
		login = require('./controllers/login'),
		
		home = require('./controllers/home'),
		reservation = require('./controllers/reservation'),
		search = require('./controllers/search')
		
	// Middleware for limited access
	function requireLogin (req, res, next) {
		if (req.session.user_id) {
			// User is authenticated, let him in
			next();
		} else {
			res.redirect('/');
		}
	}
	
	function adminOnly (req, res, next) {
		if (req.session.user_id) {
			// User is authenticated
			var User = require('./models/membres.js'),
				id = req.session.user_id;
				
			User.find({_id: id}, function(err, data){
				if (data[0].statut == '2') {	// admin's statut == 2
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
	
	// dans ce middleware on enregistre l'url en cours dans session pour rediriger correcement les pages en cas de connexion
	function currentPage (req, res, next) {
		req.session.currentPage  = req.url;
		next();
	}
	
	app.get('/', [currentPage], home.index);
	
	var prefixes = ['salles','promotions','produits','commentaires','membres', 'commandes'];
	
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
		app.post(prefix + '/new', prefixObj.create);
		
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
		app.get(prefix, [adminOnly], [currentPage], prefixObj.index);
//		app.get(prefix, [adminOnly], [currentPage], prefixObj.index);
		
		//add
		app.get(prefix + '/new', [adminOnly], [currentPage], prefixObj.new);
		app.post(prefix + '/new', [adminOnly], prefixObj.create);
		
		
		//edit
		app.get(prefix + '/edit/:id', [adminOnly], [currentPage], prefixObj.edit);
		app.post(prefix + '/edit/:id', [adminOnly], [currentPage], prefixObj.update);
//		app.post(prefix + '/edit/:id', [currentPage], prefixObj.update);
		//edit
	//	app.get(prefix + '/delete/:id', [currentPage], prefixObj.delete);
		
		//update
//		app.post(prefix +'/:id', [adminOnly], [currentPage], prefixObj.update);
		
		//destroy
		app.post(prefix + '/destroy/:id', [adminOnly], [currentPage], prefixObj.destroy);
//		app.post(prefix + '/destroy/:id', [currentPage], prefixObj.destroy);

		//show
		if (prefix != '/produits') {
			app.get(prefix + '/:id', [adminOnly], [currentPage], prefixObj.show);
		} else {
			produit = require('./controllers/produits');
			app.get('/produits/:id', [currentPage], prefixObj.show);
		}
	};




	
	//form validation routes
	app.post('/pseudo', formValidator.pseudo);
	app.post('/email', formValidator.email);
	app.post('/promocode', formValidator.promocode);
	
	// login / logout routes
	app.get('/inscription', [currentPage], login.inscription);
	app.get('/inscription/*', [currentPage], login.inscription);
	app.post('/login/create', [currentPage], login.create);
	
	app.get('/logout', [requireLogin], [currentPage], login.logout);
	app.get('/logout/*', [requireLogin], [currentPage], login.logout);
	
	app.post('/connexion/*', login.connect);
	app.post('/connexion',  login.connect);

	app.get('/profil',  [currentPage], login.profil);
	app.get('/profil/:id', [currentPage], login.profil);
	
/*
	app.get('/profil', [requireLogin], [currentPage], login.profil);
	app.get('/profil/:id', [requireLogin], [currentPage], login.profil);
*/
	
	app.get('/reservation', [currentPage], reservation.reservation);
	app.get('/recherche', [currentPage], search.search);

	//routes footer
	app.get('/mentions', [currentPage], function(req, res){
		res.render('mentions', {title: 'Mentions légales'});
	});	
	app.get('/cgv', [currentPage], function(req, res){
		res.render('cgv', {title: 'Conditions générales de vente'});
	});	
	app.get('/plan', [currentPage], function(req, res){
		res.render('plan', {title: 'Plan du site'});
	});	
	app.get('/inscription-newsletter', [currentPage], function(req, res){
		res.render('inscription-newsletter', {title: 'Inscription à la newsletter'});
	}); 	
	app.get('/contact', [currentPage], function(req, res){
		res.render('contact', {title: 'Contact'});
	}); 
	


};