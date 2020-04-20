const UserModel = require("../model/user.model");
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
require('dotenv').config();

const { check, validationResult } = require('express-validator');

// user signup
exports.sigUpNewUser = async(req, res, next) => {
    const error = validationResult(req);
    if(!error.isEmpty()) {
        return res.status(422).json({
             error: error.array()[0]
        });
    }
    const userExist = await UserModel.findOne({ email: req.body.email })
    if(userExist) return res.status(403).json({ error: `${req.body.email} Email already in use`});
    const newUser = new UserModel(req.body);
    await newUser.save() 
    res.json({ message: `user is created succssfully`})

}

//sigin user
exports.sigin = (req, res) => {
    const { email, password} = req.body
    UserModel.findOne({email}, (err,user) => {

        if(err || !user) {
            return res.status(401).json({
                error: "User does't exist with the email"
            })
        }
        if(!user.authantication(password)) {

            return res.status(401).json({
                error: "incorrect Email or password"
            })
        }

        const token = jwt.sign({_id: user._id}, process.env.jwt)
        res.cookie("t", token, {expire: new Date() + 9999});
        const { _id, email, name } = user 
        return res.json( {token, user: { _id, email, name} })
    })

}

