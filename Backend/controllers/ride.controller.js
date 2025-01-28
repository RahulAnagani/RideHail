const { validationResult } = require("express-validator")
const rideServices=require("../services/ride.services");
const mapServices=require("../services/maps.services");
const { sendMessage } = require("../socket");
const rideModel=require("../models/rides");
module.exports.getFare=async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({status:false,errors:errors.array()});
    }
    const {pickup,destination}=req.query;
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
        const {pickup,destination,vehicleType,pickCoords,destCoords}=req.body
        const user=req.user;
        if(!user){
           return res.status(400).status({status:false,message:"User not found"});
        }
        else{
            try{
                const ride=await rideServices.createRide({user:user._id,pickup,destination,vehicleType,pickCoords,destCoords});
                if(!ride){
                    return res.status(400).json({status:false});
                }
                else{
                    const coords=await mapServices.getAddressCoordinates(pickup);
                    res.status(200).json(ride);
                    let rider;
                    try{
                        rider=await rideModel.find({_id:ride._id}).populate("user");
                    }
                    catch(e){
                        console.log(e);
                    }
                    try{

                        const captains=await mapServices.getCaptains(coords.lat,coords.lng,2,vehicleType);
                        captains.map((e,i)=>{
                            sendMessage(e.socketId,{rideId:ride._id,user:rider[0].user,pickup:ride.pickup,distance:ride.distance,destination:ride.destination,fare:ride.fare,pickCoords,destCoords},"newRide");
                        })
                    }
                    catch(e){
                        console.log(e);
                    }
                }
            }
            catch(e){
                return res.status(400).json({status:false});
            }
        }
    }
}
module.exports.confirmRide=async(req,res)=>{
    if(!validationResult(req).isEmpty()){
        return res.status(400).json({status:false});
    }
    else{
        const result=await rideServices.confirmRide(req.body.rideId,req.captain._id);
        sendMessage(result.ride[0].user.socketId,{result},"riderFound");
        res.json(result.ride);
    }
}
module.exports.startRide=async(req,res)=>{
    if(!validationResult(req).isEmpty()){
        return res.status(400).json({status:false,message:"Fields ain't up to requirements"});
    }
    else{
        const ride=await rideServices.startRide(req.body.rideId,req.body.otp);
        if(!ride.status){
            return res.status(400).json(ride);
        }
        else{
                res.status(200).json(ride);
                sendMessage(ride.user.socketId,ride,"startRiding")
        }
    }
}
module.exports.endRide=async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({status:false,msg:errors.array()});
    }
    else{
        const ride=await rideServices.endRide(req.body.rideId);
        if(!ride){
            return res.status(400).json({status:false});
        }
        else{
            res.status(400).json(ride);
            sendMessage(ride.user.socketId,{status:true},"ride-end");
        }
    }
}