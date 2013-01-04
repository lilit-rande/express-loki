$(document).ready(function() {
/**
*	CONSIGNES:
		les boutons / liens "modifier" doivent avoir une classe .model-edit-link
		les boutons / liens "supprimer" doivent avoir une classe .model-delete-link
		tous les deux doivent être dans un block / parent avec leur id comme data-id et leur model comme data-model
		
		le popup correspondant doit avoir une classe {nom model}-edit (ex salle-edit)
		
		tous les champs dans le formulaire new / edit doivent avoir le name {modelname}+champsname	ex: name="salletitle"
			
*/	
	
	//draggable
	$(function() {
	    $( ".draggable" ).draggable();
	});
	
	//generique		
	function popup_show(popupName) {
		var windowHeight = $(window).height();
		var windowWidth = $(window).width();
		var element = $(".popup."+popupName);

		//centrer le popup
		var topElement = (windowHeight - element.height())/4 + $(window).scrollTop();
		var leftElement = (windowWidth - element.width())/2 + $(window).scrollLeft();
//		var topBackground = $(window).scrollTop();
	
		element.css({top:topElement, left:leftElement});	
		element.show();
		
		var currentPosition = element.position();
		var currentTop = currentPosition.top;
		 
		$('.background').css({
			"opacity" : "0.7"
		}).fadeIn("slow");
		
		$(window).scroll(function(){
			element.css({top: (windowHeight - element.height())/1.3 + $(window).scrollTop()});
		});
		
		$('body').css('overflow', 'hidden');
	}
	
	//generique
	function popup_hide() {
		$('.popup').hide();
		$('.background').fadeOut("slow");
		$('body').css('overflow', 'auto');
	}
	
	//generique
	//click sur le lien "Modifier {le model}"	
	$("body").on("click", ".model-edit-link", function(e){
		var modelName = $(this).data("model") == null ? $(this).parent().data("model") : $(this).data("model"),
			thisId = $(this).data("id") == null ? $(this).parent().data("id") : $(this).data("id"),
			url = modelName + "s/edit/" + thisId;
		console.log(modelName);
		console.log(url);
		
		e.preventDefault();
		popup_show(modelName + '-edit');
		
		$.get(url, function(data) {
			if ( data.error ) {
			} else {	
				var modelData = data.data;
				var modelObj = {};
				
				for ( d in modelData) {
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
				$('.form-' + modelName + '-edit').autofill(modelObj);
				
				console.log(modelData);
			}
		});
	});

	// generique
//Dans le popup "Modifier {le model}" :
	// bouton Annuler:
	$("body").on("click", ".bt-cancel", function(e) {
		popup_hide();
	});
	
//click sur le lien Supprimer la salle	
	$("body").on("click", ".model-delete-link", function(e){	
		e.preventDefault();
		popup_show('delete');
		var modelName = $(this).parent().data("model"),
			url = modelName + "s/delete/" + $(this).parent().data("id");
		
		console.log(modelName);
		
		$.get(url, function(data) {
			$('.delete').html(data);
		});
	});


});