const express = require('express');
const AuthController = require('../controller/auth/AuthController');

const route = express.Router();

route.post('/register', AuthController.register);

route.post('/login', AuthController.login);

route.get('/check-login-or-not', AuthController.checkLoginOrNot);

route.get('/check-user-or-not', AuthController.checkUserOrNot);

route.get('/check-admin-or-not', AuthController.checkAdminOrNot);




module.exports = route;