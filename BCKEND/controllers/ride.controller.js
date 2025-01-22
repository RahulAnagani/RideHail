const { validationResult } = require("express-validator")
const rideServices=require("../services/ride.services");
const createRide=async(req,res)=>{

}
module.exports.getFare=async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({status:false,errors:errors.array()});
    }
    const {pickup,destination}=req.body;
    const fare=await rideServices.getFare(pickup,destination);
    if(!fare){
        return res.status(400).json({status:false});
    }
    else{
        return res.status(200).json(fare);
    }
}
module.exports.createRide=async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty())return res.status(400).json({status:false});
    else{
        const user=req.user;
        if(!user){
           return res.status(400).status({status:false,message:"User not found"});
        }
        else{
            
        }
    }
}