const User=require('./models/user.model');
const mongoose=require('mongoose');
const sendResponse = require('../shared/sendResponse');


async function getUser(req,res){
    console.log("data",req.body)
    let user = await User.find();
    if(!!user){
      sendResponse(res,200,"Found user details!",user);
    }else{
        sendResponse(res,201,"user not found!");
    }
}






module.exports={
    getUser

}