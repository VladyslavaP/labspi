$(document).ready(function () {

  var socket = io.connect('http://localhost:8008');
  var messages = $('#messages');
  var message_txt = $('#message_text');
  var name = $('#name').val();

  $('.chat-block').hide();

  function msg(nick, message) {
    var m = '<div class="msg">' +
            '<span class="user">' + safe(nick) + ':</span> '
            + safe(message) +
            '</div>';

    messages
      .append(m)
      .scrollTop(messages[0].scrollHeight);
  }

  function msg_system(message) {
    var m = '<div class="msg system">' + safe(message) + '</div>';

    messages
      .append(m)
      .scrollTop(messages[0].scrollHeight);
  }

  socket.on('connecting', function () {
    msg_system('Connecting...');
  });

  socket.on('connect', function () {
    msg_system('Connected)');
  });

  socket.on('message', function (data) {
    msg(data.name, data.message);
    message_txt.focus();
  });

  socket.on('login', function(data) {

    if (data.isLogged === true) {
      $('.login').hide();
      $('.chat-block').show();
      $('.chat .nick').text(name);
    } else {
      $('#error').text(data.message);
    }
  });

  $('#login_btn').click(function () {
    name = $('#name').val();
    var password = $('#password').val();
    socket.emit('login', { name: name, password: password });
  });

  $('#message_btn').click(function () {
    var text = $('#message_text').val();

    if (text.length <= 0) {
      return;
    }

    message_txt.val('');
    socket.emit('message', {message: text, name: name});
  });

  function safe(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
});