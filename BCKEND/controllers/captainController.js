const captainModel=require("../models/captain.model");
const {validationResult}=require("express-validator");
const captainServices=require("../services/captain");
const userModel = require("../models/user.model");
const logoutModel = require("../models/logout.model");
module.exports.register=async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({status:false,message:"Fields ain't up to the requirement",errors:errors.array()});
    }
    else{
        const {fullName,email,password,vehicle}=req.body;
        const exists=await captainModel.findOne({email});
        if(exists){
            res.status(400).json({status:false,message:"User is already registered",goal:true});
        }
        else{
            const hashIt=await captainModel.hashPass(password);
            const captain=await captainServices.createCaptain({fullName,email,password:hashIt,vehicle});
            if(captain.status){
                const token=captain.captain.generateToken();
                res.cookie("token",token);
                res.status(201).json({status:true,token:token});
            }
            else{
                res.status(500).json({status:captain.status})
            }
        }
    } 
}
module.exports.login=async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({status:false,message:"Fields ain't upto the requirements",errors:errors.array()});
    }
    else{
        try{
            const {email,password}=req.body;
            const captain=await captainModel.findOne({email}).select("+password");
            if(captain){
                if(await captain.verifyPass(password)){
                    const token=captain.generateToken();
                    res.cookie("token",token);
                    res.status(200).json({status:true,token:token});
                }
                else{
                    res.status(400).json({status:false,message:"Wrong password"})
                }
            }
            else{
                res.status(404).json({status:false,message:"User not found"})
            }
        }
        catch(e){
            res.status(404).json({status:false,message:"User not found"})
        }
    }
}
module.exports.logout=async(req,res)=>{
    res.clearCookie("token");
    const token=req.cookies.token||req.headers.authorization?.split(" ")[1];
    try{
        const logit=await logoutModel.create({token:token});
        if(logit){
            res.status(200).json({status:true,message:"Successfully logged out"});
        }
        else{
            res.status(500).json({status:false});
        }
    }
    catch(e){
        res.status(500).json({status:false});
    }
}
module.exports.getProfile=(req,res)=>{
    res.status(200).json(req.captain);
}