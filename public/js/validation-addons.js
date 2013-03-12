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

	membre_validate_rules = {
		rules : {
			'pseudo_unique' : {'validate_pseudo' : true},
			'email_unique': {'validate_email' : true}
		}
	}

	
	var pseudoErrorMessage = '';
    function isPseudoOk(value, url){
	    var retVal = false;
	    
	    $.ajax({
		    url: url,
		    type: 'post',
		    data: {'pseudo': value},
		    success: function(data){
			    console.log('success');
			    if (data.response === 'error') {
				    console.log(data.msg);
//				    pseudoErrorMessage = data.error;
				    return false;
			    } else {
				    if (data.response === true) {
					    retVal = false;
					    console.log('data.response === true');
				    } else {
					    retVal = true;
					    console.log('data.response === false');
				    }
				    
				    console.log(data);
			    }
		    }
	    });
	    console.log(retVal);
	    return retVal;
    };
    
    
    $.validator.addMethod("validate_pseudo", function(value, element){
	    var returnValue = false;
	    var url = '/pseudo';
	    
	    if(!(value == "" || value == null)) {
		    returnValue = isPseudoOk(value, url);
		    console.log('returnvalue = ' + returnValue);
	    }
	    
	    if (!returnValue) {
		    pseudoErrorMessage = "Ce pseudo n'est pas disponible.";
	    }
	    
	    $.validator.messages.validate_pseudo = pseudoErrorMessage;
	    return returnValue;
    },pseudoErrorMessage);
    
    
    
    
    
    function isEmailOk(){
	    
    };
    
    

	
	
    var emailErrorMessage = '';
    $.validator.addMethod("validate_email", function(value, element){
	    
    }, emailErrorMessage);    
    
    
	$('#form-salle').validate(validate_options);
	$('#form-produit').validate(validate_options);
	$('#form-promotion').validate(validate_options);
	$('#form-membre').validate($.extend(validate_options, membre_validate_rules));
	$('#form-inscription').validate(validate_options);

});