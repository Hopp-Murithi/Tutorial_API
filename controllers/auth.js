//Defines control logic for logging in/out users
const User=require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const ApiError = require('../middleware/error') //This is the error handler middleware

module.exports.auth = async(req, res,next) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({message: 'Invalid email or password'});
        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword) return res.status(400).json({message: 'Invalid email or password'});
        res.status(200).json({message: 'Login successful'});

const accessToken = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET)
res.json({accessToken:accessToken})

    }
    catch(err){
next(ApiError.forbidden(err.message))
    }
   
}