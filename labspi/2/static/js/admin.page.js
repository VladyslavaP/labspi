var user = null;
var users = null;
var userToDelete = null;
var userToEdit = null;

$(function() {
	
	String.prototype.format = function () {
    var args = arguments;
    return this.replace(/\{(\d+)\}/g, function (m, n) { return args[n]; });
  };

	$.get(
	    '/users/me',
	    function (data) {
	    	user = data;

	      $('#hello-text').text('You are logged as {0} {1}'.format(data.role, data.userName))
	    }
		).fail(function() {
			window.location.href = '/';
		});

	$.get(
	    '/users/list',
	    function (data) {
	    	users = data;
console.log(data);
	    	for (key in data) {
	    		var user = data[key];

	    		var tr = document.createElement('tr');
	    		var tdLeft = document.createElement('td');
	    		var tdMid = document.createElement('td');
	    		var tdRight = document.createElement('td');

	    		tdLeft.innerHTML = user.userName;
	    		tdMid.innerHTML = user.fullName;
	    		tdRight.innerHTML = user.email;

	    		tr.appendChild(tdLeft);
	    		tr.appendChild(tdMid);
	    		tr.appendChild(tdRight);

	    		// add buttons

	    		var buttonDelete = document.createElement('button');
	    		buttonDelete.setAttribute('class', 'btn btn-danger btn-sm');
	    		buttonDelete.setAttribute('data-toggle', 'modal');
	    		buttonDelete.setAttribute('data-target', '#deleteModal');
	    		buttonDelete.innerHTML = 'DELETE'
	    		buttonDelete.setAttribute('onclick', 'deleteButton(' + key + ')');

	    		var tdDelete = document.createElement('td');
	    		tdDelete.appendChild(buttonDelete);

	    		tr.appendChild(tdDelete);

	    		var buttonEdit = document.createElement('button');
	    		buttonEdit.setAttribute('class', 'btn btn-info btn-sm');
	    		buttonEdit.setAttribute('data-toggle', 'modal');
	    		buttonEdit.setAttribute('data-target', '#editModal');
	    		buttonEdit.innerHTML = 'EDIT'
	    		buttonEdit.setAttribute('onclick', 'editButton(' + key + ')');

	    		var tdEdit = document.createElement('td');
	    		tdEdit.appendChild(buttonEdit);

	    		tr.appendChild(tdEdit);

	    		$('#users-table').append(tr);
	    	}
	    }
		);
});

function showErrors(errors) {
  console.log(errors);
}

function deleteButton(idx) {
	userToDelete = users[idx];
	$('#delete-text').text('Are you sure to delete {0}?'.format(userToDelete.userName));
}

function editButton(idx) {
  userToEdit = users[idx];
  $('#myModalLabel').text('Edit {0} info'.format(userToEdit.userName));

  $('#edit-fullname').val(userToEdit.fullName);
  $('#edit-email').val(userToEdit.email);
}

function confirmEdit() {
	if (!userToEdit)
		return;

	$.post(
      '/users/edit',
      {
        userName: userToEdit.userName,
      	fullName: $('#edit-fullname').val(),
      	password: $('#edit-password').val(),
      	email: $('#edit-email').val()
      },
      function (data) {
      	location.reload();
      }
		).fail(function (errors) {
			showErrors(errors);
		});
}

function confirmDelete() {
	if (!userToDelete)
		return;

	$.post(
      '/users/remove',
      {
      	userName: userToDelete.userName
      },
      function (data) {
      	location.reload();
      }
		).fail(function (errors) {
			showErrors(errors);
		});

	userToDelete = null;
}

function addUserButton() {
	$.post(
	    '/users/add',
	  	{
        userName: $('#add-username').val(),
        fullName: $('#add-fullname').val(),
        email:    $('#add-email').val(),
        password: $('#add-password').val()
  	  },
  	  function (data) {
  	  	location.reload();
  	  }
  	).fail(function (data) {
  		showErrors(data)
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