const captainModel=require("../models/captain.model");
const {validationResult}=require("express-validator");
const captainServices=require("../services/captain");
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