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
			'email_unique': {'validate_email' : true},
			'pseudo_unique' : {'validate_pseudo' : true}
		}
	}


    funciton is_pseudo_ok (){
	    
    }
    
    function is_email_ok(){
	    
    }
    $.validator.addMethod("validate_email", function(value, element){
	    
    });
    
    $.validator.addMethod("validate_pseudo", function(value, element){
	    
    });
    
    
    
    
	$('#form-salle').validate(validate_options);
	$('#form-produit').validate(validate_options);
	$('#form-promotion').validate(validate_options);
	$('#form-membre').validate($.extend(validate_options, membre_validate_rules));
	$('#form-inscription').validate(validate_options);

});