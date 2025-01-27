const crypto = require("crypto");
const RideModel = require("../models/rides")
const mapServices=require("./maps.services");
module.exports.getFare=async(pickup,destination)=>{
    if(!pickup||!destination)return null;
    const details=await mapServices.getDistance(pickup,destination);
    if(!details||details.status!=="OK")return null;
    const baseFare = {
        auto: 30,
        car: 50,
        moto: 20
    };

    const perKmRate = {
        auto: 10,
        car: 15,
        moto: 8
    };

    const perMinuteRate = {
        auto: 2,
        car: 3,
        moto: 1.5
    };
    const fare = {
        Auto: Math.round(baseFare.auto + ((details.distance.value / 1000) * perKmRate.auto) + ((details.duration.value / 60) * perMinuteRate.auto)),
        Car: Math.round(baseFare.car + ((details.distance.value / 1000) * perKmRate.car) + ((details.duration.value / 60) * perMinuteRate.car)),
        Bike: Math.round(baseFare.moto + ((details.distance.value / 1000) * perKmRate.moto) + ((details.duration.value / 60) * perMinuteRate.moto)),
        distance:details.distance.value/1000
    };

    return fare;
}
const genOtp=()=>{
    const otp=crypto.randomInt(0,10000).toString();
    return otp.padStart(4,'0');
}
module.exports.createRide=async({user,pickup,destination,vehicleType})=>{
    if(!user||!pickup||!destination||!vehicleType)return null;
    else{
        const fare=await this.getFare(pickup,destination);
        try{
            const ride=await RideModel.create({
                user,
                pickup,
                destination,
                vehicleType,
                distance:fare.distance,
                fare:fare[vehicleType],
                status:"pending",
                otp:"PENDING",
            })
            return ride;
        }
        catch(e){
            console.log(e);
        }
    }
}
module.exports.confirmRide=async(rideId,captain)=>{
    if(!rideId){
        return null;
    }
    else{
        const otp=genOtp()
        try{

            await RideModel.findByIdAndUpdate({_id:rideId},{
                status:'accepted',
                captain:captain,
                otp:otp
            });
            const ride=await RideModel.find({_id:rideId}).populate("captain").populate("user");
            return {ride:ride,otp:otp};
        }
        catch(e){
            console.log(e);
            return null;
        }
    }

}
module.exports.startRide=async(rideId,otp)=>{
    if(!rideId||!otp){
        return null;
    }
    else{
        try{
            const ride=await RideModel.find({_id:rideId}).populate("user").populate("captain").select("+otp");
            if(!ride){
                return {status:null,message:"No ride found"};
            }
            else if(ride[0].status!=='accepted'){
                return {status:null,message:"The ride ain;t accepted"};
            }
            else if(ride[0].otp!==otp){
                return {status:null,message:"The otp is not matching"};
            }
            else{
                await RideModel.findOneAndUpdate({_id:rideId},{
                    status:"riding"
                })
                return ride[0];
            }
        }
        catch(e){
            return null;
        }
    }
}