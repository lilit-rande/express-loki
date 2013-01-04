
/**
 * Module dependencies.
 */

var mongo = require('mongodb'),
	Server = mongo.Server,
	Db = mongo.Db;

var server = new Server('localhost', 27017);

var db = new Db('lokisalle', server, {safe:false});

//new Db(new Server('localhost', 27017), {safe:false})



//db connection
db.open(function(err, db){
	if(!err) {
		console.log("We are connected");
		
//the {safe:true} retournes un error if the collection already exists
		db.createCollection('salles', function(err, collection) {
			var salle1 = [
				{'title' : 'Salle Duval'},
				{'ville' : 'Paris'},
				{'cp' : '75015'},
				{'description' : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi'},
				{'image' : 'url'}				
			];
			collection.insert(salle1);
		});
	} else {
		console.log("Error : ", err);
	}
});

