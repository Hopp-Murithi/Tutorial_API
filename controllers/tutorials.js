//Defines control logic for tutorial endpoints.

const ApiError = require('../middleware/error');
const Tutorial = require('../models/tutorial');
const auth= require('../helpers/jwt.helper')


const getTutorials = async(req,res,next)=>{
    try{
        const tutorial= await Tutorial.find()
        res.status(200).json(tutorial)
    }
    catch(err)
    {
        next(ApiError.badRequest(err))
    }
   
 
}
const getOneTutorial = async(req,res,next)=>{
    try{
        const tutorial= await Tutorial.findById()
        res.status(200).json(tutorial)
    }
    catch(err)
    {
        next(ApiError.badRequest(err))
    }
}
const postTutorial=('',auth,async(req,res,next)=> {
try{
const tutorial= await new Tutorial({

})
}
catch{
    
}
})

module.exports = {getTutorials,getOneTutorial}