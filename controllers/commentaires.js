//The commentaire controller
var superController = require('../controllers/controller.js'),
	Model = require('../models/commentaires.js'),
	Salle = require('../models/salles.js'),
	Member = require('../models/membres.js'),
	fs = require('fs'),
	jade = require('jade'),
	async = require('async');

function renderTpl(tplName, tplBody){
	var jadefile = fs.readFileSync(tplName),
		jadetemplate = jade.compile(jadefile),
		content = jadetemplate(tplBody);
	return content;
}

//index listing of promos at :  /commentaires/
exports.index = function(req, res){	
	Model
		.find()
		.populate('salle_id membre_id')
		.exec(function(err, docs) {
		if(err) {
			throw err;
		} else if( (docs) && (docs.length) ) {
			res.render('commentaires/index', { title: 'Commentaire', docs: docs});
		} else {
			res.render('commentaires/index', { title: 'Commentaire', docs: null});
		}
	});
}

//delete a comment
exports.destroy = function(req, res) {
	var ref = req.params.id,
		member = req.body.member,
		salle = req.body.salle;
	
	
	Model.remove({'_id': ref}, function(err){
		if(err) {
			res.render('generals/error', {title: "Echec de suppression", body: "Il n'y a pas d'commentaire avec un identifient " + ref});
		} else {
			async.parallel([
				function (callback) {
					return Salle.findOne({'_id': salle}, function(err, salle){
						var index = salle.commentaires.indexOf(ref);
						if (index != -1) {
							salle.commentaires.splice(index);
							salle.save();
						}
						return callback(err);
					});
				}, function(callback) {
					Member.findOne({'_id': member}, function(err, member){
						var index = member.commentaires.indexOf(ref);
						if (index != -1) {
							member.commentaires.splice(index);
							member.save();
						}
						return callback(err);
					});
				}
			], function(err) {
		//		res.redirect('/commentaires/index');
		res.render('generals/modified', {title: "Commentaire supprimé", body: "Le commentaire a bien été supprimé."});
			});

			
			
			
			
//			res.render('generals/modified', {title: "Commentaire supprimé", body: "Le commentaire a bien été supprimé."});
		}
	});
};

exports.edit = function(req, res) {
	var  ref = req.params.id;
	
	Model.findOne({'_id': ref}, function(err, doc){
		if (err) {
			res.render('error', {title: "Echec de modification", body: "Ce commentaire n'existe plus !"});
		} else {
			res.data = doc;
			
			var	options = {'title':'Modifier le commentaire', 'action': 'commentaires/edit/' + ref,  'type': 'Modifier'},
				html = renderTpl('views/forms/commentaires/edit.jade', options);
				res.html = html;
				res.send({data: doc, html: html});	
		}	//fin else
	});

};


exports.update = function(req, res) {
	var commentaire = {	
			comment: req.body.commentairecomment,
			note: req.body.commentairenote
		},
	ref = req.params.id;

	Model.update({'_id': ref}, commentaire, function(err, docs) {
		if (err) {
			res.render('generals/error',{title: "Problème avec la mise à jour: ", body: 'Message : ' + err});
		} else {
			res.render('generals/modified', {title: "Membre modifié", body: "Le membre a bien été modifiée."});
		}
	});
};

exports.new = function(req, res) {}

exports.create = function(req, res) {
	var 
		salle_id = req.body.salle,
		membre_id = req.session.user_id;

	var comment = { 
			comment : req.body.commentaire,
			note : req.body.note,
			membre_id : membre_id,
			salle_id: salle_id
	},
	modelObj = new Model(comment),
	url = req.session.currentPage ? req.session.currentPage : '/' ;

	modelObj.save(function(err, data){
		if(err) {
			res.render('generals/error', {title: "Echec de création", body: "Il n'est pas possible d'ajouter ce commentaire ! Message : " + err.message});
		} else {
			Salle.findOne({'_id': salle_id}, function(err, salle){
				salle.commentaires.push(data._id);
				salle.save();				
			});
			Member.findOne({'_id': membre_id}, function(err, member){
				member.commentaires.push(data._id);
				member.save();
			});
			res.redirect(url);
		}
	});
};



//methodes fictives juste pour que les routes marchent


exports.show = function(req, res) {
/*
	var	ref = req.params.id;

	Model.findOne({'_id': ref})
		.populate('salle_id')
		.populate('membre_id')
		.exec(function(err, doc){	
		if(err) {
			throw err;
		} else {
			if (!doc) {
				res.render('commentaires/show', {id: ref, title:'Détailles de l\'commentaire', data:doc});
			} else {
				res.render('commentaires/show', {title: 'Détailles de l\'commentaire', data: doc});
			}
		}
	});
	*/
}



