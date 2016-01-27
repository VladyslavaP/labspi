var UsersAPI = require('./usersAPI');

var express = require('express');
var Router = express.Router();

var api = new UsersAPI();

api.seed();

Router.get('/me', api.me);
Router.get('/logout', api.logout);
Router.get('/list', api.list);

Router.post('/login', api.login);
Router.post('/add', api.addUser);
Router.post('/remove', api.removeUser);
Router.post('/edit', api.editUser);

module.exports = Router;