//This controller will map the routes to the functions of salles controller
exports.mapRoute = function(app, prefix) {
	prefix = '/' + prefix;
	
	var prefixObj = require('.' + prefix);
	
	//index
	app.get(prefix, prefixObj.index);
	
	//add
	app.get(prefix + '/new', prefixObj.new);
	
	//create
	app.post(prefix + '/create', prefixObj.create);
	
	//edit
	app.get(prefix + '/edit/:id', prefixObj.edit);
			
	//edit
	app.get(prefix + '/delete/:id', prefixObj.delete);
	
	//update
	app.post(prefix +'/:id', prefixObj.update);
	
	//destroy
	app.post(prefix + '/destroy/:id', prefixObj.destroy);
	
	//show
	app.get(prefix + '/:id', prefixObj.show);
};