const userServices=require("../services/user.services");
const userModel=require("../models/user.model");
const {validationResult}=require("express-validator");
module.exports.registerUser=async(req,res)=>{
    if(!validationResult(req).isEmpty()){
        res.status(400).json({status:false,message:"Feilds ain't according to the rules",errors:validationResult(req).array()});
    }
    else{
        const {fullName,password,email}=req.body;
        const exists=userModel.findOne({email});
        if(exists){
            res.status(400).json({status:false,goal:true,message:"User already exists"});
        }
        const hashPass=await userModel.hashPass(password);
        const resp=await userServices.registerUser({fullName,hashPass,email});
        if(resp.status){
            const token=resp.user.generateToken();
            res.status(201).json({token});
        }
        else{
            res.status(400).json(resp);
        }
    }
}