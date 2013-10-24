$(document).ready(function() {
/**
*	CONSIGNES:
		les boutons / liens "modifier" doivent avoir une classe .model-edit-link
		les boutons / liens "supprimer" doivent avoir une classe .model-delete-link
		tous les deux doivent être dans un block / parent avec leur id comme data-id et leur model comme data-model
		
		le popup correspondant doit avoir une classe {nom model}-edit (ex salle-edit)
		
		tous les champs dans le formulaire new / edit doivent avoir le name {modelname}+champsname	ex: name="salletitle"
			
*/	

	// TODO
	//input(type="file") du modal salle-edit
	$('input[id=file]').change(function() {
		$('#salle-image-visible').val($(this).val().replace("C:\\fakepath\\", ""));
	});

	//draggable
	$(function() {
	    $( ".draggable" ).draggable();
	});
	
	//click sur le lien "View {le model}"
	$("body").on("click", ".model-view-link", function(e){
		var modelName = $(this).data("model") == null ? $(this).parent().data("model") : $(this).data("model"),
			thisId = $(this).data("id") == null ? $(this).parent().data("id") : $(this).data("id"),
			url = modelName + "s/" + thisId
			;
			$(location).attr('href',url);
	});

//click sur le lien "Modifier {le model}"	
	$("body").on("click", ".model-edit-link", function(e){
		var modelName = $(this).data("model") == null ? $(this).parent().data("model") : $(this).data("model"),
			id = $(this).data("id") == null ? $(this).parent().data("id") : $(this).data("id"),
			url = modelName + "s/edit/" + id;

			
			$('#modal-' + modelName + '-edit .modal-footer').data('id', id);
			$('#modal-' + modelName + '-edit .modal-footer').data('model', modelName);
					
			$.get(url, function(data) {
			if ( data.error ) {
				console.log(data.error);
			} else {	
				var modelData = data.data;
				var modelObj = {};
				
				for ( var d in modelData) {
					if ( ( d != '_id') && ( d.indexOf('reference') == -1 ) && (d != 'image') ) {
						modelObj[ modelName + d] = modelData[d];
					}
					if ( d.indexOf('reference') != -1 ) {		// les references des models sont enregistrés comme par ex sallereference donc on sépare ce cas pour ne pas avoir sallesallereference
						modelObj[d] = modelData[d];
					}
					if (d == 'image') {
						modelObj[ modelName + d + 'visible'] = modelData[d];	// le champs file s'appelle ex salleimage, on n'a pas le droit d'y mettre le chemin récuperé du fichier chargé 
					}
				}

				$('.' + modelName + '-edit').html(data.html);
				$('.form-' + modelName + '-edit').autofill(modelObj);		// autofill permet de remplir automatiquement les champs d'un forumlaire dans le variable data.html par les données data.data, envoyés par le serveur dans notre cas
								
				switch(modelName) {
					case 'produit': {
						if (data.foreignModels.salle) {
					
							var salles = data.foreignModels.salle;
							var selectSalle = $('#select-salle');
							var $old_salle_id = $('#old_salle_id');
							
							for (var salle=0; salle <salles.length; salle++) {
								var s = salles[salle];
								var prod = s.produits;
									
								if ($.inArray(id, prod) > -1) {
									$("option[value=" + s._id + "]")
										.attr("selected", "selected");								
									$old_salle_id.attr("value", s._id);
								}					
							}
						}		
						if (data.foreignModels.promotion) {
							var promotions = data.foreignModels.promotion;
							var selectPromo = $('#select-promotion');
							var $old_promotion_id = $('#old_promotion_id');
							
							for (var promo=0; promo < promotions.length; promo++) {
								var p = promotions[promo];
								if ($.inArray(id, p.produits) != -1) {
									$("option[value=" + p._id + "]")
										.attr("selected", "selected");
									$old_promotion_id.attr("value", p._id);
								}
							}
						}	
					}
					break;
					case 'membre': {
						$('input:radio[name="sexe"]').each(function(){
							if ($(this).val() == data.data.sexe) {
								$(this).attr("checked", "checked");
							}
						});
						$("option[value=" + data.data.statut + "]").attr("selected", "selected");
					}
					break;
				}
			}	// endOf else
		});		//endOf get
			
	}).on('click',	'.edit-model-btn', function(){
		
		// les data-id et data-model ont été définis plus haut dans $("body").on("click", ".model-edit-link"...)
		
		var id = $(this).parent().data('id');
		var model = $(this).parent().data('model');		

		var url = '/' + model + 's/edit/' + id;
		var data = $('#form-' + model).serialize();

		$.post(url, data, function(){
			location.reload();
		});

	});	//edit bouton clicked


	$("body").on("click", ".new-model-btn", function(e){
		var modelName = $(this).data("model") == null ? $(this).find().data("model") : $(this).data("model");
		
		var url = '/' + modelName + 's/new';

		data = $('#form-' + modelName + '-new').serialize();
	
		if($('#form-' + modelName + '-new').valid()) {	// pour jquery.validation
			$.post(url, data, function(){
				location.reload();
			});	
		}
	});

//Supprimer le {model}
	$("body").on("click", ".model-delete-link", function(e){
		var id = $(this).parent().data("id");
		var modelName = $(this).parent().data("model");
		
		$('#modal-delete').data('id', id);
		$('#modal-delete').data('model', modelName);
		
		switch ( modelName ){
			case 'commentaire':
				var member = $(this).parent().data("member");
				var salle = $(this).parent().data("salle");
				
				var data = {member: member, salle: salle};
				
				$('#modal-delete').data('data', data);
			break;
			case 'produit':
				var promotion = $(this).parent().data("promotion");
				var salle = $(this).parent().data("salle");
				
				var data = {promotion: promotion, salle: salle};
				
				$('#modal-delete').data('data', data);
			break;
		}
		
	}).on('click', '.delete-confirm', function(){
	
		var model = $('#modal-delete').data("model");
		var id = $('#modal-delete').data("id");
		var data = {};
		
		if ($('#modal-delete').data("data")) {
			data = $('#modal-delete').data("data"); 
		}
		
		var	url = model + "s/destroy/" + id;
		
		$.post(url, data, function(){
			location.reload();
		});
	});;
	
	$("#modal-connect").on("click", ".submit", function(e){
		$('#modal-connexion-form').submit();
	});

// PANIER
	$('body').on('click', '.add-to-cart', function(e){
		var url = 'ajouter-panier',
			id = $(this).data('id'),
			data_text = $('textarea#datas-json-' + id).val(),
			that = $(this);

		$(this).data('produit', data_text);

		var json_data = JSON.parse($(this).data('produit'));
		$.ajax({
			type: 'post',
			url: url,
			data: json_data,
			dataType: 'json',
			success: function(data){
				$('#modal-panier .modal-body #message').html(data.message);
				that.html('Retirer du panier >');
				that.removeClass('add-to-cart');
				that.addClass('remove-from-cart');
			//	that.attr('href', 'retirer-panier/' + id);				
				$('#nb_articles').html(data.count);				
			}
		});
	});

	$('body').on('click', '.remove-from-cart', function(e){
		//	e.preventDefault();
		var id = $(this).data('id'),
			that = $(this),
			url = 'retirer-panier/' + id;
			
		$.ajax({
			url: url,
			type: 'post',
			success: function(data) {
				$('#modal-panier .modal-body #message').html(data.message);
				that.html('Ajouter au panier >');
				that.removeClass('remove-from-cart');
				that.addClass('add-to-cart');				
				$('#nb_articles').html(data.count);
			}
		})
	});

	$('body').on('click', '#empty_cart', function(e){
		e.preventDefault();
		url = $(this).attr('href');
		$.post(url, function(data){
			if ( data.response == 'ok' ) {
				location.reload();
			}
		});
	});

    // Datepicker
    $('.datepicker').datepicker({
    	inline: true
    });
    
    
});