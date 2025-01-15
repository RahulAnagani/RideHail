const jwt=require("jsonwebtoken");
const userModel=require("../models/user.model");
const logoutModel = require("../models/logout.model");
const captainModel=require("../models/captain.model");
module.exports.validateUser=async(req,res,next)=>{
    const token=req.cookies.token||req.headers.authorization?.split(" ")[1];
    if(!token){
        res.status(400).json({status:false,message:"No token found in the headers and the cookies"});
    }
    else{
        try{
            const isLogout=await logoutModel.findOne({token});
            if(isLogout){
                res.status(400).json({status:false,message:"The user has been logged out cannot make any requests"});
            }
            const deco=jwt.verify(token,process.env.JWT_KEY);
            const user=await userModel.findOne({_id:deco._id});
            if(user){
                req.user=user;
                next();
           }
            else{
                res.status(401).json({status:false,message:"Token ain't eligible for verifying"});
            }
        }
        catch(e){
            if(e.name=="TokenExpiredError"){
                res.clearCookie("token");
                await logoutModel.create({token});
                return res.status(400).json({status:false,message:"The token is expired so you have been logged out."});
            }
            res.status(500).json({status:false});
        }
    }
}
module.exports.validateCaptain=async(req,res,next)=>{
    const token=req.cookies.token||req.headers.authorization?.split(" ")[1];
    if(!token){
        res.status(400).json({status:false,message:"Token not found"});
    }
    else{
        try{
            const isLogout=await logoutModel.findOne({token});
            if(isLogout){
               return res.status(400).json({status:false,message:"The user has been loggedOut"});
            }
            else{
                const deco=jwt.verify(token,process.env.JWT_KEY);
                const captain=await captainModel.findOne({_id:deco._id});
                req.captain=captain;
                next();
            }
        }
        catch(e){
            if(e.name==='TokenExpiredError'){
                res.status(400).json({status:false,message:"The captain's token is expired"});
            }
            else res.status(500).json({status:false});
        }
    }
}