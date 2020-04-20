const { check } = require('express-validator');

exports.userSignUpValidation = [
    check('name')
        .notEmpty().withMessage("name is require"),
    check('email')
        .notEmpty().withMessage('email is required')
        .isEmail().withMessage('please enter a valid email'),
    check('password')
        .notEmpty().withMessage('password is required')
        .isLength({ min: 5 }).withMessage('must be at least 5 chars long')
        .matches(/\d/).withMessage('must contain a number'),
    check('phoneNumber')
        .notEmpty().withMessage('phone number is required')
        .isMobilePhone().withMessage('enter valid mobile number')    
]

exports.userSignInVlidation = [
    check('email')
        .notEmpty().withMessage('email is require')
        .isEmail().withMessage('please enter a valid email'),
    check('password')
        .notEmpty().withMessage('password is requrire')
]