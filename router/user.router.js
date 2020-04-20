const express = require('express').Router();

const UserController = require('../controller/user.controller');
const validator = require('../validations/validater')

express.post("/signUp", validator.userSignUpValidation, UserController.sigUpNewUser);
express.post('/signin', validator.userSignInVlidation, UserController.sigin);

module.exports = express