function isNumberKey(evt){
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}

// window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
//   'size': 'invisible',
//   'callback': function(response) {
//     // reCAPTCHA solved, allow signInWithPhoneNumber.
//     onSignInSubmit();
//   }
// });

// var recaptchaResponse = grecaptcha.getResponse(window.recaptchaWidgetId);
$('#verify_otp_model').hide()
$('#errorbox').hide()

// phone auth
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('getotp', {
      'size': 'invisible',
      'callback': function(response) {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        //onSignInSubmit();
        
      }
    });
    // [END appVerifier]

  recaptchaVerifier.render().then(function(widgetId) {
      window.recaptchaWidgetId = widgetId;
    //  updateSignInButtonUI();
    });

  var aadhaar_no_phone_no = {
  	"7382537xxxxx": "915801xxxx",
  	"300000000000": "7276xxxxxx",
	"<replace your aadhaar no here>": "<your phone number>",
  }


  function onSignInSubmit() {
    window.signingIn = true;
    $('#errorbox').hide();
   // updateSignInButtonUI();
    var phoneNumber = "+91" + aadhaar_no_phone_no[$('#aadhaar_no').val()];
    //console.log(phoneNumber);
      var d = new Date();
      d.setTime(d.getTime() + (1*24*60*60*1000));      
      var expires = "expires="+ d.toUTCString();
      document.cookie = 'aadhaar' + "=" + $('#aadhaar_no').val() + ";" + expires + ";path=/";

    $('#verifyc').text('Enter verification code send to '+phoneNumber)
     var appVerifier = window.recaptchaVerifier;
     firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
          .then(function (confirmationResult) {
            
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            window.confirmationResult = confirmationResult;
            window.signingIn = false;
           // updateSignInButtonUI();
            // $('.verification-code-form').show()
            // $('#hidepf').hide()
            $('#enter_aadhaarno').hide()
            $('#verify_otp_model').show()
            console.log('otp');
            
          }).catch(function (error) {
            // Error; SMS not sent
            // $('.main_loader').hide()

            //console.error('Error during signInWithPhoneNumber', error);
            window.alert('error\n\n'+error);
            window.signingIn = false;
            //updateSignInFormUI();
            //updateSignInButtonUI();
            $('.verification-code-form').hide()
          });
  }
// Phone auth end //

$(verifyotp).click(function(){
		var code = $('#verify_otp').val()
      	confirmationResult.confirm(code).then(function (result) {
        // User signed in successfully.
        var user = result.user;
        window.verifyingCode = false;
        //login success
        console.log(user.uid);
        var d = new Date();
    	d.setTime(d.getTime() + (1*24*60*60*1000));      
    	var expires = "expires="+ d.toUTCString();
    	document.cookie = 'show' + "=" + user.uid + ";" + expires + ";path=/";
    	window.location = '/info'

      }).catch(function (error) {
        // User couldn't sign in (bad verification code?)
        console.error('Error while checking the verification code', error);
        window.alert('Error while checking the verification code:\n\n'
           + error.code + '\n\n' + error.message);
        window.verifyingCode = false;
        $('#errorbox').show()
		$('#error').text('Enter valid OTP')
      });
});


$(getotp).click(function(){
	if ($('#aadhaar_no').val()=="") {
		$('#errorbox').show()
		$('#error').text('Please Enter Aadhaar No')

    }
    else{
    	onSignInSubmit();
    	$('#errorbox').hide()
    }
});
