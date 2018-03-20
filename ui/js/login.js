$(document).ready(function () {

	//error hide
	$(messagebox).hide()

	$(login).click(function(){
		if (($('#username').val()=="")) {
			$(messagebox).show()
			$(errormsg).text('Please Enter Username');
		} else if (($('#password').val()=="")) {
			$(messagebox).show()
			$(errormsg).text('Please Enter valid Password');

		} else {
			$(messagebox).hide()
			$.ajax({
				url: "/login",
				method: "post",
				dataType: 'json',
				contentType: 'application/json'	,
				data: JSON.stringify({
					"username": $('#username').val(),
					"password": $('#password').val(),
				}),
				success: function (data) {
					$(messagebox).show()
					$(errormsg).text('Redirecting...')
					res.redirect('/app');
				},
				statusCode: {
			        500: function() {
			        	$(messagebox).show()
			        	console.log('error');
			          	$(errormsg).text('Error Invalid Username/Password');
			        }
			      }
				
			 });//.done(function(msg){
			// 	$(errormsg).text('Redirecting...');

			// }).fail(function(e){
			// 	$(errormsg).text(e);
			// });
		}
	});
});