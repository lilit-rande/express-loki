exports.routes = function(app) {
	var formValidator = require('./controllers/formvalidations'),
		login = require('./controllers/login'),
		
		home = require('./controllers/home'),
		reservation = require('./controllers/reservation'),
		panier = require('./controllers/panier'),
		search = require('./controllers/search')
/* 
session {
	cookie: { 
		path: '/',
		_expires: null,
		originalMaxAge: null,
		httpOnly: true 
	},
	currentPage: req.url,
	user_id: ObjectId,
	pseudo: pseudo,
	statut: statut,

	panier: [ { produit_id: '5191075f44a6e40000000005',
		produit_title: '4646',
		arrive: '2013-05-26T22:00:00.000Z',
		depart: '2013-05-28T22:00:00.000Z',
		prix: '85',
		promotion_id: '5162b10874c37fe12a000019',
		promotion_code: 'KL214J',
		promotion_reduction: '60',
		salle_id: '5162b10874c37fe12a000006',
		salle_title: 'Salle Delaroche',
		salle_adresse: '10 rue Adresse',
		salle_capacite: '20',
		salle_categorie: 'réunion',
		salle_cp: '75',
		salle_image: 'vignette_ph_15.jpg',
		salle_pays: 'France',
		salle_ville: 'Paris' 
	} ],
	panier_count: 0 
}
*/

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

	// function loadPanier(req, res, next) {
	// 	var Panier = require('./models/panier.js');

	// 	if (req.cookies.sId) {
	// 		var sId = req.cookies.sId;

	// 		Panier
	// 		.findOne({'sid': sId})
	// 		.populate('membre_id produit_id promotion_id salle_id')
	// 		.exec(function(err, panier){
	// 			if (panier != null) {
	// 				req.session.panier = [];
	// 				var panier_obj = {};

	// 				panier_obj.produit_id = panier.produit_id._id;
	// 				panier_obj.produit_title = panier.produit_id.title;
	// 				panier_obj.arrive = panier.produit_id.arrive;
	// 				panier_obj.depart = panier.produit_id.depart;
	// 				panier_obj.prix = panier.produit_id.prix;

	// 				panier_obj.promotion_id = (panier.promotion_id) ? panier.promotion_id._id : '';
	// 				panier_obj.promotion_code = (panier.promotion_id) ? panier.promotion_id.code : '';
	// 				panier_obj.promotion_reduction = (panier.promotion_id) ? panier.promotion_id.reduction : 0;

	// 				panier_obj.salle_id = panier.salle_id._id;
	// 				panier_obj.salle_title = panier.salle_id.title;
	// 				panier_obj.salle_adresse= panier.salle_id.adresse;
	// 				panier_obj.salle_capacite = panier.salle_id.capacite;
	// 				panier_obj.salle_categorie = panier.salle_id.categorie;
	// 				panier_obj.salle_cp = panier.salle_id.cp;
	// 				panier_obj.salle_image = panier.salle_id.image;
	// 				panier_obj.salle_pays = panier.salle_id.pays;
	// 				panier_obj.salle_ville = panier.salle_id.ville;
	// 				panier_obj.date_creation = panier.dateCreation;

	// 				req.session.panier.push(panier_obj);
	// 				req.session.panier_count = panier.count;



					
	// 			} 
	// 		});
	// 	}
	// 	next();
	// }
	
	// dans ce middleware on enregistre l'url en cours dans session pour rediriger correcement les pages en cas de connexion
	function currentPage (req, res, next) {
		req.session.currentPage  = req.url;
		next();
	}
	
	app.get('/', [currentPage], home.index);
	
	var prefixes = ['salles','promotions','produits','commentaires', 'membres', 'commandes'];
	
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

	app.get('/profil', [requireLogin], [currentPage], login.profil);
	app.get('/profil/:id', [requireLogin], [currentPage], login.profil);
	
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


	// reservation
	app.get('/reservation', [currentPage], reservation.reservation);
	app.get('/reservation/*', [currentPage], reservation.reservation);

	// gestion panier
	app.get('/panier', [currentPage], panier.index);
	app.get('/panier/*', [currentPage], panier.index);

	app.post('/ajouter-panier', [currentPage], panier.ajouter_panier);
	app.post('/retirer-panier/:id', [currentPage], panier.retirer_panier);
	app.get('/vider-panier', [currentPage], panier.vider_panier);



















};