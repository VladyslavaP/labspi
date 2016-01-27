var user = null;

$(function() {
	
	String.prototype.format = function () {
    var args = arguments;
    return this.replace(/\{(\d+)\}/g, function (m, n) { return args[n]; });
  };

	$.get(
	    '/users/me',
	    function (data) {
	    	user = data;

	      $('#hello-text').text('You are logged as {0} {1}'.format(data.role, data.userName));

	      $('#fullname').val(data.fullName);
	      $('#email').val(data.email);
	    }
		).fail(function() {
			window.location.href = '/';
		});

	$.get(
	    '/users/list',
	    function (data) {
	    	for (key in data) {
	    		var user = data[key];

	    		var tr = document.createElement('tr');
	    		var tdLeft = document.createElement('td');
	    		var tdRight = document.createElement('td');

	    		tdLeft.innerHTML = user.fullName;
	    		tdRight.innerHTML = user.email;

	    		tr.appendChild(tdLeft);
	    		tr.appendChild(tdRight);

	    		$('#users-table').append(tr);
	    	}
	    }
		);
});

function showErrors(errors) {
  console.log(errors);
}

function editButton() {
  $.post(
      '/users/edit',
      {
      	userName: user.userName,
      	fullName: $('#fullname').val(),
      	password: $('#password').val(),
      	email: $('#email').val()
      },
      function (data) {
      	location.reload();
      }
  	).fail(function (errors) {
  		showErrors(errors);
  	});
}

function logoutButton() {
	$.get(
		  '/users/logout',
		  function (data) {
		  	window.location.href = data.redirectURL;
		  }
		);
}