$(function() {

    $('#login-form-link').click(function(e) {
		$("#login-form").delay(100).fadeIn(100);
 		$("#register-form").fadeOut(100);
		$('#register-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});

	$('#register-form-link').click(function(e) {
		$("#register-form").delay(100).fadeIn(100);
 		$("#login-form").fadeOut(100);
		$('#login-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});
});

function ShowErrors(errors) {
	console.log('errors: ');
  console.log(errors);
}

function buttonRegister() {
	if ($('#password').val() !== $('#confirm-password').val()) {
    ShowErrors('bla bla bla');
    return;
	}
	else
		$.post(
	  	  '/users/add',
	  	  {
	        userName: $('#username').val(),
	        fullName: $('#fullname').val(),
	        email:    $('#email').val(),
	        password: $('#password').val()
	  	  },
	  	  function (data) {
	  	  	location.reload();
	  	  }
	  	).fail(function (data) {
	  		ShowErrors(data)
	  	});
};

function buttonLogin() {
	$.post(
      '/users/login',
      {
      	userName: $('#login-username').val(),
      	password: $('#login-password').val()
      },
      function (data) {
        window.location.href = data.redirectURL;
      }
		).fail(function (xhr) {
			ShowErrors(xhr.responseJSON);
		});
}
