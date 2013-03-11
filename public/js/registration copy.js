$(document).ready(function(){

// The Registration form 
	var registrationform = $('#registrationform');
	var promo_code = $('#promo_code', registrationform);
	
	var validate_additional_options = {	
		errorPlacement : function (error, element) {
			element.closest( ".control-group").find( "label" ).first().after(error);
		},
		focusInvalid: false
	};

	var registration_validate_options = $.extend(validate_options, validate_additional_options);	
	
	registration_validate_rules = {
		rules : {
			'email_confirm':{ equalTo: '#email' },
//			'price_spe' : {required: true},
//			'price_spe' : {'validate_price' : true},
			'promo_code' : {'validate_price' : true}
		}
	}
	
	registrationform.validate(
		$.extend(registration_validate_options, registration_validate_rules)
	);
	
// Step 2				
	promo_code.on('focus', function(){
		$('#price_promo')[0].checked = true;
	});
			
	$('#price').on('click', function() {
		var parent = $(this).closest('.control-group');
		
		promo_code.val('');
		promo_code.next('span.help-inline').remove();
		
		parent.find("span.help-inline").first().remove();
		parent.removeClass('error');
		parent.addClass('success');
//		$(this)
	});
			
					
	$.validator.addMethod("validate-tva-num", function(value, element){
		return  ! ( (value == "" || value == null) && ($('#country').val() != country) ) ;
	}, 'Please enter your VTA Num');

		
	function isPromoOk(value, url, event) {
		var retVal;
		
		$.ajax({
			url: url,
			data: {item: 'verif-promo', code:value, event:event, output: 'json'},
			success: function(json){
						if (json.res == "ok") {
							retVal = true;						
						} else {
							retVal = false;
						}								
					},
			async: false
		});
		return retVal;		
	}

	var errorMessage = '';


	
	$.validator.addMethod("validate_price", function(value, element){
		var returnValue;
		
		if( $('#price_promo').is(':checked') ) {
			if ( !(value == "" || value == null) ) {		
				returnValue = isPromoOk(value, url, event);				
				if (!returnValue) {
					errorMessage = 'Le code promo n\'est pas correct';
				}
			} else {
				returnValue = false;
				errorMessage = 'Le code promo n\'est pas correct';
			}
		} else {
			if ( $('#price').is(':checked') ) {
				return true;
			} else {
				returnValue = false;
				errorMessage = 'Merci de sélectionner votre tarif';
			} 
		}
		
		$.validator.messages.validate_price = errorMessage;
				
		return returnValue;
	}, errorMessage);

	$('#goBack', registrationform).on('click', function(){
		$('#step', registrationform).val() = $('#step').val()-1;
		$('#back', registrationform).val() = 'true';
		registrationform.submit();
			
		return false;
	});
//endOf Registration form

});	// endOf $(document).ready