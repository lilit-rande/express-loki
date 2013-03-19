$(document).ready(function() {

// validate 
	var validate_options = {
		errorClass: "help-inline",
		errorElement: "span",
		highlight:function(element, errorClass, validClass){
			$(element).parents('.control-group').removeClass('success');
			$(element).parents('.control-group').addClass('error');
		},
		unhighlight: function(element, errorClass, validClass)	{
			$(element).parents('.control-group').removeClass('error');
			$(element).parents('.control-group').addClass('success');
		}
	};

	var membre_validate_rules = {
		rules : {
			'pseudo' : {'validate_pseudo' : true},
			'email': {'validate_email' : true}
		}
	}

	var promotion_validate_rules = {
		rules : {
			'promotioncode' : {'validate_promocode': true}
		}
	}

	
	var errorMessage = '';
    function isValueOk(value, url, fieldName){
	    var retVal = false,
	    	fieldName = fieldName;
	    
	    $.ajax({
		    url: url,
		    type: 'post',
		    data: {fieldName: value},
		    success: function(data){
			    var datas = JSON.parse(data);
			    
			    if (datas.response === 'error') {
				    console.log(datas.msg);
				    return false;
			    } else {
				    if (datas.response) {				    	
					    retVal = false;
				    } else {
					    retVal = true;					    
				    }				    
			    }
		    },
		    async:false
	    });
	    return retVal;
    };
   
    /*
    $.validator.addMethod("validate_pseudo", function(value, element, url){
	    var returnValue = false;
	    var url = '/pseudo';
	    
	    if(!(value == "" || value == null)) {
		    returnValue = isValueOk(value, url, 'pseudo');
	    }	    
	    if (!returnValue) {
		    errorMessage = "Ce pseudo n'est pas disponible.";
	    }	    
	    $.validator.messages.validate_pseudo = errorMessage;
	    return returnValue;
    }, errorMessage);
    
    */
        
    $.validator.addMethod("validate_pseudo", function(value, element){
	    var returnValue = false;
	    var url = '/pseudo';
	    
	    if(!(value == "" || value == null)) {
		    returnValue = isValueOk(value, url, 'pseudo');
	    }
	    return returnValue;
    }, "Ce pseudo n'est pas disponible.");

    
    $.validator.addMethod("validate_email", function(value, element){
	    var returnValue = false;
	    var url = '/email';
	    
	    if(!(value == "" || value == null)) {
		    returnValue = isValueOk(value, url, 'email');
	    }
	    
//	    if (!returnValue) { errorMessage = "Cet email n'est pas disponible."; }
	    return returnValue;
	    
    }, "Cet email n'est pas disponible.");    
    
    $.validator.addMethod("validate_promocode", function(value, element){
		var returnValue = false;
		var url = '/promocode';
		
		if(!(value == "" || value == null)) {
		returnValue = isValueOk(value, url, 'promotioncode');
		}
		
		return returnValue;
    }, "Ce code promo n'est pas disponible");
    
	$('#form-salle').validate(validate_options);
	$('#form-produit').validate(validate_options);
	
	$('#form-promotion').validate(validate_options);
	$('#form-promotion-new').validate($.extend(validate_options, promotion_validate_rules));
	
	$('#form-membre').validate($.extend(validate_options, membre_validate_rules));
	$('#form-membre-new').validate($.extend(validate_options, membre_validate_rules));
	$('#form-inscription').validate($.extend(validate_options, membre_validate_rules));

});